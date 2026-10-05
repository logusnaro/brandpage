import { NextRequest, NextResponse } from "next/server";
import { publicPath, saveVisit, statsEnvironment } from "@/lib/visit-stats";
import {createHmac} from "node:crypto";
const windows=new Map<string,{count:number;until:number}>();
export async function POST(request: NextRequest) {
  const origin=request.headers.get("origin"), host=request.nextUrl.hostname;
  const env=statsEnvironment(host);
  if (!env || origin !== `https://${host}`) return new NextResponse(null,{status:403});
  if (Number(request.headers.get("content-length") || 0)>512) return new NextResponse(null,{status:413});
  const ip=request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const rateKey=createHmac("sha256",process.env.AUTH_SECRET || "local").update(ip).digest("hex");
  const now=Date.now();
  for (const [key,value] of windows) if(value.until<now) windows.delete(key);
  const window=windows.get(rateKey)||{count:0,until:now+60000};
  if (window.count>=20 || windows.size>=2000) return new NextResponse(null,{status:429});
  window.count++;windows.set(rateKey,window);
  if (/bot|crawler|spider/i.test(request.headers.get("user-agent") || "")) return new NextResponse(null,{status:204});
  const raw=await request.text();
  if (raw.length>512) return new NextResponse(null,{status:413});
  let body;
  try { body=JSON.parse(raw); } catch { return new NextResponse(null,{status:400}); }
  const uuid=/^[a-f0-9-]{36}$/i;
  if (!uuid.test(body.session||"") || !uuid.test(body.visit||"") || typeof body.path!=="string" || !publicPath(body.path) || !Number.isInteger(body.seconds) || body.seconds<0 || body.seconds>3600) return new NextResponse(null,{status:400});
  try { await saveVisit(env,body.session,body.visit,{path:body.path,seconds:body.seconds}); }
  catch { return NextResponse.json({error:"통계를 저장하지 못했습니다."},{status:503}); }
  return new NextResponse(null,{status:204});
}
