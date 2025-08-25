import { S3Client } from "@aws-sdk/client-s3"
import dotenv from 'dotenv'

dotenv.config()

const requiredEnv = ["BUCKET_NAME", "BUCKET_REGION", "ACCESS_KEY", "SECRET_ACCESS_KEY"] as const;

for (const envVar of requiredEnv) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const BUCKET_NAME = process.env.BUCKET_NAME!
const region = process.env.BUCKET_REGION!
const accessKeyId = process.env.ACCESS_KEY!
const secretAccessKey = process.env.SECRET_ACCESS_KEY!

export const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
})