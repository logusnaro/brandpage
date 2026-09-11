import { readFile } from "node:fs/promises";
import { createCipheriv, createHash, randomBytes } from "node:crypto";
import { createClient } from "@sanity/client";

const source = new URL("../../../01_second-brain/reference(html)/logus-dashboard-data.json", import.meta.url);
const payload = await readFile(source, "utf8");
const data = JSON.parse(payload);
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) throw new Error("SANITY_API_WRITE_TOKEN이 설정되지 않았습니다.");
const secret = token;
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", createHash("sha256").update(secret).digest(), iv);
const encrypted = Buffer.concat([cipher.update(payload, "utf8"), cipher.final()]);
const protectedPayload = JSON.stringify({iv:iv.toString("base64"),tag:cipher.getAuthTag().toString("base64"),data:encrypted.toString("base64")});
const client = createClient({projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID||"7wq3nq5m",dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||"production",apiVersion:"2025-02-19",token,useCdn:false});
await client.createOrReplace({_id:"operations-dashboard",_type:"operationsSnapshot",generatedAt:new Date(data.generatedAt).toISOString(),payload:protectedPayload});
console.log(JSON.stringify({generatedAt:data.generatedAt,projects:data.projects?.length||0}));
