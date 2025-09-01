import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from 'dotenv'

dotenv.config()

const requiredEnv = ["BUCKET_NAME", "PUBLIC_BUCKET_NAME","BUCKET_REGION", "ACCESS_KEY", "SECRET_ACCESS_KEY"] as const;
for (const envVar of requiredEnv) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

const BUCKET_NAME = process.env.BUCKET_NAME!
const PUBLIC_BUCKET_NAME = process.env.PUBLIC_BUCKET_NAME!
const region = process.env.BUCKET_REGION!
const accessKeyId = process.env.ACCESS_KEY!
const secretAccessKey = process.env.SECRET_ACCESS_KEY!

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
})

export async function uploadFileToS3(fileName: string, buffer: Buffer, contentType: string, isPublic = false): Promise<string> {
  const currBucket = isPublic ? PUBLIC_BUCKET_NAME: BUCKET_NAME
  await s3.send(
    new PutObjectCommand({
      Bucket: currBucket,
      Key: fileName,
      Body: buffer,
      ContentType: contentType,
    })
  );

  return `https://${currBucket}.s3.${region}.amazonaws.com/${fileName}`;
}

export async function deleteFileFromS3(fileName: string): Promise<void> {
  await s3.send(
    new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
    })
  );
}

export async function getFileUrlFromS3(fileName: string, expiresIn = 3600): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileName,
  });
  return await getSignedUrl(s3, command, { expiresIn });
}

export async function getPreSignedUrlIfExists(avatarFileName: string | null){
  if (!avatarFileName) return null;
  return await getFileUrlFromS3(avatarFileName);
}