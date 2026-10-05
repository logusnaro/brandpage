import "server-only";
import { createHmac } from "node:crypto";
import { GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {getR2UsageBytes,R2_STORAGE_LIMIT_BYTES} from "@/lib/r2";
let quotaCheckedAt=0, withinQuota=true;

export const publicPath = (path: string) => /^(\/(?:#(?:intro|studio|product|contact))?|\/apps(?:\/[a-z0-9-]+)?|\/legal\/[a-z0-9-]+\/[a-z0-9-]+|\/daybybaby\/(?:privacy|terms))$/.test(path);
export const dateInSeoul = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Seoul" }).format(new Date());
export function statsEnvironment(host: string) {
  if (["logusstudio.com", "www.logusstudio.com"].includes(host)) return "production";
  if (host === "test.logusstudio.com") return "test";
  return null;
}
function storage() {
  const { CLOUDFLARE_ACCOUNT_ID: account, R2_ACCESS_KEY_ID: accessKeyId, R2_SECRET_ACCESS_KEY: secretAccessKey, R2_BUCKET_NAME: bucket } = process.env;
  if (!account || !accessKeyId || !secretAccessKey || !bucket || !process.env.AUTH_SECRET) throw new Error("통계 저장소 설정이 필요합니다.");
  return { bucket, sdk: new S3Client({region:"auto", endpoint:`https://${account}.r2.cloudflarestorage.com`, credentials:{accessKeyId,secretAccessKey}}) };
}
type Visit = { path: string; seconds: number };
export async function saveVisit(env: string, session: string, visit: string, value: Visit) {
  if(Date.now()-quotaCheckedAt>300000) {withinQuota=(await getR2UsageBytes())<R2_STORAGE_LIMIT_BYTES;quotaCheckedAt=Date.now();}
  if(!withinQuota) throw new Error("저장 한도 초과");
  const {sdk,bucket} = storage();
  const hash = createHmac("sha256", process.env.AUTH_SECRET!).update(session).digest("hex");
  const Key = `analytics/v1/${env}/${dateInSeoul()}/${hash}/${visit}.json`;
  for (let retry=0; retry<3; retry++) {
    let ETag: string | undefined, previous: Visit | undefined;
    try {
      const object = await sdk.send(new GetObjectCommand({Bucket:bucket,Key}));
      ETag=object.ETag; previous=JSON.parse(await object.Body!.transformToString());
    } catch (error) { if ((error as { $metadata?: {httpStatusCode?:number} }).$metadata?.httpStatusCode !== 404) throw error; }
    if (previous && previous.path !== value.path) return;
    if (previous && previous.seconds >= value.seconds) return;
    try {
      await sdk.send(new PutObjectCommand({Bucket:bucket,Key,ContentType:"application/json",Body:JSON.stringify(value), ...(ETag ? {IfMatch:ETag} : {IfNoneMatch:"*"})}));
      return;
    } catch (error) { if ((error as {$metadata?:{httpStatusCode?:number}}).$metadata?.httpStatusCode !== 412) throw error; }
  }
  throw new Error("통계 저장 충돌");
}
export async function readVisitStats(env: string) {
  const {sdk,bucket} = storage(), prefix=`analytics/v1/${env}/`, today=dateInSeoul();
  const all = new Set<string>(), daily = new Set<string>(), keys: string[]=[];
  let token: string | undefined, scanned=0, truncated=false;
  const cutoff = new Date(Date.now()-30*86400000).toISOString().slice(0,10);
  do {
    const list=await sdk.send(new ListObjectsV2Command({Bucket:bucket,Prefix:prefix,ContinuationToken:token}));
    for (const obj of list.Contents || []) {
      if (!obj.Key) continue;
      const [date,visitor]=obj.Key.slice(prefix.length).split("/");
      all.add(visitor); if (date===today) daily.add(visitor);
      if (date>=cutoff) keys.push(obj.Key);
      scanned++;
    }
    token=list.IsTruncated ? list.NextContinuationToken : undefined;
    if (scanned>=100000) { truncated=Boolean(token); break; }
  } while (token);
  const pages: Record<string,{views:number;seconds:number}>={};
  const selected=keys.slice(-5000);
  for (let i=0;i<selected.length;i+=10) {
    await Promise.all(selected.slice(i,i+10).map(async Key=>{
      const obj=await sdk.send(new GetObjectCommand({Bucket:bucket,Key}));
      const data:Visit=JSON.parse(await obj.Body!.transformToString());
      const page=pages[data.path] ||= {views:0,seconds:0}; page.views++; page.seconds+=data.seconds;
    }));
  }
  return {today:daily.size,total:all.size,date:today,environment:env,truncated:truncated||keys.length>5000,pages:Object.entries(pages).map(([path,p])=>({path,...p,average:Math.round(p.seconds/p.views)})).sort((a,b)=>b.seconds-a.seconds),updatedAt:new Date().toISOString()};
}
