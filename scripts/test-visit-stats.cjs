const fs=require('fs'),vm=require('vm'),ts=require('typescript'),assert=require('assert/strict');
const data=new Map(); let version=0,conflict=false;
class Command {constructor(input){this.input=input;}}
class GetObjectCommand extends Command{} class PutObjectCommand extends Command{} class ListObjectsV2Command extends Command{}
class S3Client {
  async send(cmd){const p=cmd.input;
    if(cmd instanceof GetObjectCommand){const item=data.get(p.Key);if(!item)throw {$metadata:{httpStatusCode:404}};return {ETag:item.etag,Body:{transformToString:async()=>item.body}};}
    if(cmd instanceof PutObjectCommand){const old=data.get(p.Key);if(conflict){conflict=false;throw {$metadata:{httpStatusCode:412}};}if((p.IfNoneMatch&&old)||(p.IfMatch&&old?.etag!==p.IfMatch))throw {$metadata:{httpStatusCode:412}};data.set(p.Key,{etag:String(++version),body:p.Body});return {};}
    return {Contents:[...data.keys()].filter(k=>k.startsWith(p.Prefix)).map(Key=>({Key})),IsTruncated:false};
  }
}
const code=ts.transpileModule(fs.readFileSync('src/lib/visit-stats.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const mod={exports:{}};
const env={AUTH_SECRET:'test-secret',CLOUDFLARE_ACCOUNT_ID:'test',R2_ACCESS_KEY_ID:'test',R2_SECRET_ACCESS_KEY:'test',R2_BUCKET_NAME:'test'};
vm.runInNewContext(code,{exports:mod.exports,require:n=>n==='server-only'?{}:n==='@aws-sdk/client-s3'?{S3Client,GetObjectCommand,PutObjectCommand,ListObjectsV2Command}:n==='@/lib/r2'?{getR2UsageBytes:async()=>0,R2_STORAGE_LIMIT_BYTES:9e9}:require(n),process:{env},Intl,Date,Map,Set,JSON});
(async()=>{const s=mod.exports;
  assert(s.publicPath('/apps/memogrip'));assert(s.publicPath('/#product'));assert(!s.publicPath('/admin'));assert(!s.publicPath('/?email=x'));
  assert.equal(s.statsEnvironment('logusstudio.com'),'production');assert.equal(s.statsEnvironment('test.logusstudio.com'),'test');assert.equal(s.statsEnvironment('unknown.example'),null);
  await s.saveVisit('test','session1','visit1',{path:'/apps/memogrip',seconds:10});
  await s.saveVisit('test','session1','visit1',{path:'/apps/memogrip',seconds:0});
  conflict=true;await s.saveVisit('test','session1','visit1',{path:'/apps/memogrip',seconds:40});
  await s.saveVisit('test','session1','visit2',{path:'/',seconds:20});
  await s.saveVisit('production','session2','visit1',{path:'/',seconds:100});
  const stats=await s.readVisitStats('test');assert.equal(stats.today,1);assert.equal(stats.total,1);assert.equal(stats.pages.find(p=>p.path==='/apps/memogrip').seconds,40);assert.equal(stats.pages.length,2);
  const prod=await s.readVisitStats('production');assert.equal(prod.total,1);assert.equal(prod.pages.length,1);assert.equal(prod.pages[0].seconds,100);
  assert([...data.keys()].every(k=>!k.includes('session1')));
  console.log('PASS: duplicate/late events, conditional conflict, environment isolation, path allowlist, session privacy, aggregation');
})().catch(e=>{console.error(e);process.exitCode=1;});
