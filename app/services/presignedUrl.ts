import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import client from '../middlewares/awsMiddleware';

const createPresignedUrl = async (bucket: string, key: string) => {

  const command = new PutObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(client, command, { expiresIn: 900 });
};

export default createPresignedUrl;