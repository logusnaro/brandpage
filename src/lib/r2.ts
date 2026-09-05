import "server-only";
import { GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
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

export const R2_STORAGE_LIMIT_BYTES = 9 * 1024 * 1024 * 1024;

export async function getR2UsageBytes() {
  const { sdk, bucket } = client();
  let continuationToken: string | undefined;
  let total = 0;
  do {
    const page = await sdk.send(new ListObjectsV2Command({ Bucket: bucket, ContinuationToken: continuationToken }));
    total += page.Contents?.reduce((sum, item) => sum + (item.Size ?? 0), 0) ?? 0;
    continuationToken = page.IsTruncated ? page.NextContinuationToken : undefined;
  } while (continuationToken);
  return total;
}

export async function createUploadUrl(key: string, contentType: string, contentLength: number) {
  const { sdk, bucket } = client();
  return getSignedUrl(sdk, new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: contentType, ContentLength: contentLength }), { expiresIn: 600 });
}

export async function createDownloadUrl(key: string, fileName: string) {
  const { sdk, bucket } = client();
  return getSignedUrl(sdk, new GetObjectCommand({
    Bucket: bucket,
    Key: key,
    ResponseContentDisposition: `attachment; filename="${fileName.replace(/["\r\n]/g, "")}"`,
  }), { expiresIn: 300 });
}
