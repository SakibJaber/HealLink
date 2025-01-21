// import { Injectable } from '@nestjs/common';
// import * as nodemailer from 'nodemailer';

// @Injectable()
// export class MailerService {
//   private transporter;

//   constructor() {
//     this.transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });
//   }

//   async sendVerificationEmail(
//     username: string,
//     email: string,
//     userId: number,
//     token: string,
//   ) {
//     const verificationLink = `http://localhost:3000/auth/verify`;
//     const html = `
//       <p>Dear ${username},</p>
//       <p>Thanks for signing up. Please verify your email using the link below:</p>
//           <ul>
//             <li>User ID: ${userId}
//             </li>
//             <li>Token: ${token}
//             </li>
//           </ul>
//       <p>verify Link: <a href="${verificationLink}">Verify Email</a></p>
//       <p>If you didn't request this, please ignore this email.</p>
//       <p><strong>This is an automated message. Do not reply.</strong></p>
//     `;

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'Email Verification',
//       html,
//     };

//     try {
//       await this.transporter.sendMail(mailOptions);
//       console.log(`Verification email sent to ${email}`);
//     } catch (error) {
//       console.error('Error sending email:', error);
//       throw new Error('Failed to send verification email.');
//     }
//   }
// }

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendVerificationEmail(
    username: string,
    email: string,
    userId: number,
    token: string,
  ) {
    const verificationLink = `http://localhost:3000/auth/verify`;
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
  body{font-family:Arial,sans-serif;margin:0;padding:0;background-color:#f4f4f4;color:#333}.container{max-width:600px;margin:40px auto;background:#fff;padding:30px;border-radius:8px;box-shadow:0 4px 8px rgba(0,0,0,.1)}.header{text-align:center;padding:20px 0}.header img{width:120px;margin-bottom:10px}.header h2{color:#007BFF;font-size:24px;margin:0}.content{font-size:16px;line-height:1.6;color:#333;margin:20px 0}.content strong{color:#555}.button-container{text-align:center;margin:20px 0}.button{display:inline-block;background-color:#007BFF;color:#fff !important;text-decoration:none;padding:12px 24px;font-size:16px;border-radius:6px;font-weight:bold;margin-top:10px}.button:hover{background-color:#0056b3}.footer{font-size:14px;color:#777;text-align:center;margin-top:20px}.footer hr{border:none;border-top:1px solid #ddd;margin:20px 0}.footer p{margin:0;padding:0}
</style>

</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://ideazhos.com/img/logo-dark.png" alt="Your Logo">
      <h2>Email Verification</h2>
    </div>
    <div class="content">
      <p>Dear <strong>${username}</strong>,</p>
      <p>Thank you for signing up! Please verify your email address to complete your registration.</p>
      <ul>
        <li><strong>User ID:</strong> ${userId}</li>
        <li><strong>Token:</strong> ${token}</li>
      </ul>
      <div class="button-container">
        <a href="${verificationLink}" class="button">Verify Email</a>
      </div>
      <p>If you didn’t request this, please ignore this email.</p>
    </div>
    <div class="footer">
      <hr>
      <p><strong>This is an automated message. Do not reply.</strong></p>
      <p>© 2025 Your Company Name. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification',
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Verification email sent to ${email}`);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send verification email.');
    }
  }
}
