import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // 1. Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use SendGrid or Mailtrap later
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2. Define email options
  const mailOptions = {
    from: `NexusMart Support <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
        <h2 style="color: #4f46e5;">NexusMart Security</h2>
        <p>${options.message}</p>
        <p>If you did not request this, please ignore this email.</p>
      </div>
    `,
  };

  // 3. Send the email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;