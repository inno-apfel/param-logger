import {
  Request, 
  Response
} from 'express'
import sharp from 'sharp'

import { uploadFileToS3 } from '../db/s3'
import generateFileName from '../utils/generateFileName'

export async function uploadImage(
  req: Request,
  res: Response,
) {
    console.log(req.file)
    if (!req.file) return res.status(400).json({ messages: ["No file uploaded"] });

    const buffer = await sharp(req.file.buffer)
        .jpeg()
        .toBuffer();
    // push image to s3
    const fileName = generateFileName();
    const staticURL = await uploadFileToS3(fileName, buffer, req.file.mimetype, true)
    
    return res.json(
        {url:staticURL}
    );
};