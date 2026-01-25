const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// =======================
// OTP EMAILER
// =======================
async function otpEmailer(to, subject, text) {
  try {
    await sgMail.send({
      to,
      from: {
        email: process.env.SENDER_EMAIL, 
        name: 'OTP CODE FROM YOUR PORTFOLIO'
      },
      subject,
      text,
    });
    console.log("Email sent to:", to);
  } catch (error) {
    console.error("Failed to send email:", error.response ? error.response.body : error);
    throw error;
  }
}

// =======================
// CONTACT FORM EMAILER
// =======================
async function contactFormEmailer(visitorName, visitorEmail, message, ownerEmail) {
  try {
    await sgMail.send({
      to: ownerEmail, // portfolio owner inbox
      from: {
        email: process.env.SENDER_EMAIL, 
        name: 'From Your Portfolio Website'
      },
      replyTo: visitorEmail,
      subject: `Portfolio Contact: ${visitorName} (${visitorEmail})`,
      text: message,
    });

    console.log("Contact form email sent to:", ownerEmail);

  } catch (error) {
    console.error("Failed to send contact form:", error.response ? error.response.body : error);
    throw error;
  }
}


module.exports = {otpEmailer, contactFormEmailer};
