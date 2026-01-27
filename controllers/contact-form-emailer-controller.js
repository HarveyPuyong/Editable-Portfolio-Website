const User = require("../models/user-schema");
const { contactFormEmailer } = require('../utils/emailer');

// Contact form controller
const sendContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Find User
    const user = await User.findOne();
    if (!user) return res.status(404).json({ message: "User not found" });

    // Send the email
    await contactFormEmailer(name, email, message, user.email);

    return res.status(200).json({ message: 'Message sent successfully!' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to send message.' });
  }
};

module.exports = { sendContactForm };
