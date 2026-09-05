import "server-only";
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

function config() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucket = process.env.R2_BUCKET_NAME;
  if (!accountId || !accessKeyId || !secretAccessKey || !bucket) {
    throw new Error("Cloudflare R2 환경변수가 설정되지 않았습니다.");
  }
  return { accountId, accessKeyId, secretAccessKey, bucket };
}

function client() {
  const value = config();
  return {
    bucket: value.bucket,
    sdk: new S3Client({
      region: "auto",
      endpoint: `https://${value.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: value.accessKeyId,
        secretAccessKey: value.secretAccessKey,
      },
    }),
  };
}

export async function createUploadUrl(key: string, contentType: string) {
  const { sdk, bucket } = client();
  return getSignedUrl(sdk, new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: contentType }), { expiresIn: 600 });
}

export async function createDownloadUrl(key: string, fileName: string) {
  const { sdk, bucket } = client();
  return getSignedUrl(sdk, new GetObjectCommand({
    Bucket: bucket,
    Key: key,
    ResponseContentDisposition: `attachment; filename="${fileName.replace(/["\r\n]/g, "")}"`,
  }), { expiresIn: 300 });
}
