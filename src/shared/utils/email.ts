import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // .env에 설정
      pass: process.env.GMAIL_PASS,
    },
  });
  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject,
      html,
    });
    console.log(`📧 메일 전송 성공: to=${to}, subject=${subject}`);
    return true;
  } catch (error) {
    console.error('📧 메일 전송 실패:', error);
    return false;
  }
}
