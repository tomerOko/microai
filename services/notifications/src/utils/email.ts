// utils/email.ts
export const sendEmail = async (to: string, content: { subject: string; body: string }) => {
    // Implement email sending logic using an email service provider
    // For example, using SendGrid, Mailgun, etc.
    console.log(`Sending email to ${to}: ${content.subject}`);
  };
  