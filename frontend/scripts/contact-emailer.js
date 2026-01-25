import { popupSuccess, popupError } from "./../utils/popup-alert.js";
import contactEmailerAPI from "./../api/contact-emailer-api.js";

function ContactFormEmailer() {
  const contactForm = document.querySelector('#email-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.querySelector('#email-form__name-input').value.trim();
    const emailInput = document.querySelector('#email-form__email-input').value.trim();
    const messageInput = document.querySelector('#email-form__message-input').value.trim();

    // Simple validation
    if (!nameInput || !emailInput || !messageInput) {
      popupError("Please fill out all fields.");
      return;
    }

    const formData = {
      name: nameInput,
      email: emailInput,
      message: messageInput
    };

    try {
      const res = await contactEmailerAPI(formData);
      popupSuccess(res.message);
      contactForm.reset();
      
    } catch (err) {
      popupError(err.response?.data?.message || "Failed to send message.");
      console.error(err);
    }
  });
}

export default ContactFormEmailer;
