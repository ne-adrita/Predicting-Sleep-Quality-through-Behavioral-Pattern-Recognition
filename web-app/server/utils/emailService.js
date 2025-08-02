const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendPasswordResetEmail = async (email, token) => {
  const resetUrl = `http://yourfrontendurl.com/reset-password?token=${token}`;
  
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Naptagram Password Reset',
    html: `
      <p>You requested a password reset for your Naptagram account.</p>
      <p>Click <a href="${resetUrl}">here</a> to reset your password.</p>
      <p>This link will expire in 1 hour.</p>
    `
  });
};

module.exports = { sendPasswordResetEmail };