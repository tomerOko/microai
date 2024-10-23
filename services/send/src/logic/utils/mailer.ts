import { functionWrapper } from 'common-lib-tomeroko3';
import nodemailer from 'nodemailer';

import { ENVs } from '../../configs/ENVs';

const { address: baseAddress, password } = ENVs.email;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: baseAddress,
    pass: password,
  },
});

export const sendEmail = async (address: string, content: string, subject: string) => {
  return functionWrapper(async () => {
    try {
      // Compose the email message
      const mailOptions = {
        from: baseAddress,
        to: address,
        subject,
        text: content,
      };
      // Send the email
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  });
};
