import * as aws from '@aws-sdk/client-ses';

const ses = new aws.SES({
  apiVersion: '2010-12-01',
  region: process.env.PAYLOAD_REGION,
  credentials: {
    accessKeyId: process.env.PAYLOAD_ACCESS_KEY_ID!,
    secretAccessKey: process.env.PAYLOAD_SECRET_ACCESS_KEY!,
  }
})

export const email = {
  SES: { ses, aws }
};
