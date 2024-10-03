// utils/s3Uploader.ts
import AWS from 'aws-sdk';

const s3 = new AWS.S3();

export const uploadToS3 = async (fileContent: Buffer): Promise<string> => {
  const params = {
    Bucket: 'your-s3-bucket',
    Key: `receipts/receipt-${Date.now()}.pdf`,
    Body: fileContent,
    ContentType: 'application/pdf',
  };

  await s3.putObject(params).promise();

  // Generate a signed URL valid for 7 days
  const signedUrl = s3.getSignedUrl('getObject', {
    Bucket: params.Bucket,
    Key: params.Key,
    Expires: 7 * 24 * 60 * 60, // 7 days in seconds
  });

  return signedUrl;
};
