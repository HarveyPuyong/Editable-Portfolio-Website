const User = require("../models/user-schema");
const { contactFormEmailer } = require('../utils/emailer');

// Contact form controller
const sendContactForm = async (req, res) => {
  try {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim();
    const message = req.body.message?.trim();

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Find User
    const user = await User.findOne();
    if (!user) return res.status(404).json({ message: "User not found" });

    const ownerEmail = user.email;

    // Send the email
    await contactFormEmailer(name, email, message, ownerEmail);

    return res.status(200).json({ message: 'Message sent successfully!' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to send message.' });
  }
};

module.exports = { sendContactForm };
