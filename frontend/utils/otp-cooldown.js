let otpSecondsCooldown = 0; 
let otpTimer = null;

export default function otpCooldown(seconds) {
  otpSecondsCooldown = seconds;
  const otpResendButton = document.querySelector('.otp-form__resend-otp')
  otpResendButton.classList.add('cooldown');

   otpTimer = setInterval(() => {
    otpSecondsCooldown--;

    if (otpSecondsCooldown <= 0) {
      clearInterval(otpTimer);
      otpResendButton.classList.remove('cooldown');
    }
  }, 1000);
}