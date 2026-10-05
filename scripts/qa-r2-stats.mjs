import {S3Client,PutObjectCommand,GetObjectCommand,DeleteObjectCommand} from '@aws-sdk/client-s3';
import assert from 'node:assert/strict';
const sdk=new S3Client({region:'auto',endpoint:`https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,credentials:{accessKeyId:process.env.R2_ACCESS_KEY_ID,secretAccessKey:process.env.R2_SECRET_ACCESS_KEY}});
const Bucket=process.env.R2_BUCKET_NAME,Key=`analytics/qa/${crypto.randomUUID()}.json`;
try {
 await sdk.send(new PutObjectCommand({Bucket,Key,Body:JSON.stringify({path:'/apps/memogrip',seconds:0}),IfNoneMatch:'*',ContentType:'application/json'}));
 const first=await sdk.send(new GetObjectCommand({Bucket,Key}));
 assert.equal(JSON.parse(await first.Body.transformToString()).seconds,0);
 await sdk.send(new PutObjectCommand({Bucket,Key,Body:JSON.stringify({path:'/apps/memogrip',seconds:20}),IfMatch:first.ETag,ContentType:'application/json'}));
 await assert.rejects(()=>sdk.send(new PutObjectCommand({Bucket,Key,Body:'{}',IfMatch:first.ETag})),e=>e.$metadata?.httpStatusCode===412);
 console.log('PASS R2 real read/write and stale ETag conflict');
} finally {await sdk.send(new DeleteObjectCommand({Bucket,Key}));console.log('QA temporary object removed');}
