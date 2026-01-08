// utils/emailer.js
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(to, subject, text) {
  try {
    await sgMail.send({
      to,
      from: process.env.SENDER_EMAIL,
      subject,
      text,
    });
    console.log("Email sent to:", to);
  } catch (error) {
    console.error("Failed to send email:", error.response ? error.response.body : error);
    throw error;
  }
}

module.exports = sendEmail;
