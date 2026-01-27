
import attachInputSanitizers from "./../utils/sanitize-input.js"
import {loginUserAPI, sendOtpAPI, verifyOtpAPI, changePasswordAPI} from "./../api/auth-api.js";
import  {popupSuccess, popupError, closePopupAlert} from "./../utils/popup-alert.js";
import {switchToEditMode} from "./../utils/switch-to-edit-mode.js"
import otpCooldown from "./../utils/otp-cooldown.js"


/* ==========================================================================
   ENFORCE EDIT MODE ACCESS
   Ensures only authorized users can enter edit mode
   ========================================================================== */
const validateEditPermissions = () => {
  const mainWrapper = document.querySelector('.main-wrapper');
  const accessToken = localStorage.getItem('accessToken');

  // If no token, force view-mode initially
  if (!accessToken) {
    mainWrapper.classList.remove('edit-mode');
    mainWrapper.classList.add('view-mode');
  }

  // Only observe if no token (to avoid unnecessary observer for authorized users)
  if (!accessToken) {
    const observer = new MutationObserver(() => {
      if (mainWrapper.classList.contains('edit-mode')) {
        mainWrapper.classList.remove('edit-mode');
        mainWrapper.classList.add('view-mode');
        console.warn('Edit mode access denied.');
      }
    });

    observer.observe(mainWrapper, { attributes: true, attributeFilter: ['class'] });
  }
};


/* ==========================================================================
   HANDLE LOGIN
   ========================================================================== */
const handleLogin = () => {
  const loginForm = document.getElementById('login-form');
  const loader = document.querySelector('.loading-container');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = loginForm.querySelector("#email-input").value.trim();
    const password = loginForm.querySelector("#password-input").value.trim();

    // SHOW loader bago mag request
    if (loader) loader.classList.remove('hide');

    try {
      const data = await loginUserAPI({ email, password });

      if (data?.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        popupSuccess('Logged In Successfully'); //nasa closePopupAlert function ang pag call ng switchToEditMode
      }

    } catch (err) {
      const data = err.response?.data;

      if (data?.errors?.length) popupError(data.errors.map(e => e.msg || e.message).join('\n'));
      else if (data?.message) popupError(data.message);
      else popupError("Failed to Login");
      
      console.error('Full error:', data);
      console.error(err);

    } finally {
      // HIDE loader kapag MAY RESPONSE NA
      if (loader) loader.classList.add('hide');
    }
  });
}


// ===============================
// HANDLE SEND OTP
// ===============================
const handleSendOTP = () => {
  const buttons = document.querySelectorAll('.login-form__forgot-password, .otp-form__resend-otp');
  const loader = document.querySelector('.loading-container');

  buttons.forEach(button => {
    button.addEventListener('click', async () => {
      if (loader) loader.classList.remove('hide');

      try {
        const response = await sendOtpAPI();
        const cooldown = response.data.cooldown || 60;

        otpCooldown(cooldown)

        if (response?.status === 200) popupSuccess(response.data.message);

      } catch (err) {
        const errorMessage = err?.response?.data?.message || err.message || 'An error occurred';
        popupError(errorMessage);
        
      } finally {
        if (loader) loader.classList.add('hide');
      }
    });
  });
}

// ===============================
// HANDLE VERIFY OTP
// ===============================
const handleVerifyOTP = () => {
  const changePasswordForm = document.querySelector('#reset-password-form');
  const otpForm = document.querySelector('#otp-form');
  const otpInputs = document.querySelectorAll('.otp-form__input');

  otpForm.addEventListener('submit', async e => {
    e.preventDefault();

    const otp = Array.from(otpInputs).map(i => i.value).join('');

    if (otp.length < 6) {
      alert('Please enter the complete 6-digit OTP.');
      return;
    }

    try {
      const response = await  verifyOtpAPI({ otp });

      if (response.status === 200) {
        changePasswordForm.classList.remove('hide');
        otpForm.classList.add('hide');
        otpInputs.forEach(inp => (inp.value = ''));
        otpInputs[0].focus();
      } 
    } catch (err) {
      const errorMessage = err.response.data.message || 'An error occured';
      popupError(errorMessage);
      otpInputs.forEach(inp => (inp.value = ''));
      otpInputs[0].focus();
    }
  });
}

// ===============================
// HANDLE CHANGE PASSWORD
// ===============================
const handleChangePassword = () => {
  const changePasswordForm = document.querySelector('#reset-password-form');
  const login = document.querySelector('#login-form');

  changePasswordForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const password = document.querySelector('#new-password-input').value.trim();
    const confirmPassword = document.querySelector('#re-enter-password').value.trim();

    try{
      const response = await changePasswordAPI({password, confirmPassword});
       if(response.status === 200) {
          const responseMessage = response.data.message
          popupSuccess(responseMessage);

          await new Promise((res) => setTimeout(res, 2500));

          const popupSuccessContainer = document.querySelector('.popup-success');
          popupSuccessContainer.classList.add('hide');
          changePasswordForm.classList.add("hide");
          login.classList.remove("hide");
       }  

    } catch (err) {
      const data = err.response?.data;

      if (data?.errors?.length) popupError(data.errors.map(e => e.msg || e.message).join('\n'));
      else if (data?.message) popupError(data.message);
      else popupError("Change Password");
      
      console.error('Full error:', data);
      console.error(err);
      changePasswordForm.reset();
    }
  });
}

/* ==========================================================================
   TOGGLE PASSWORD VISIBILITY
   ========================================================================== */
const togglePasswordVisibility = () => {
  document.querySelectorAll(".password-wrapper").forEach(wrapper => {
    const passwordInput = wrapper.querySelector("input[type='password'], input[type='text']");
    const eyeIcon = wrapper.querySelector(".toggle-password-icon");

    if (!passwordInput || !eyeIcon) return; 

    eyeIcon.addEventListener("click", () => {
      const isHidden = passwordInput.type === "password";

      // Toggle visibility
      passwordInput.type = isHidden ? "text" : "password";

      // Toggle icons
      eyeIcon.classList.toggle("fa-eye");
      eyeIcon.classList.toggle("fa-eye-slash");
    });
  });
};


// ===============================
// OTP AUTO NEXT/PREV INPUTS
// ===============================
const otpAutoNextPrevInput = () => {
  const otpForm = document.querySelector('#otp-form');
  const otpInputs = document.querySelectorAll('.otp-form__input');

  otpInputs.forEach((input, index) => {
    input.addEventListener('input', e => {
      const value = e.target.value;
      if (/^\d$/.test(value)) {
        e.target.value = value;
        if (index < otpInputs.length - 1) otpInputs[index + 1].focus();
      } else {
        e.target.value = '';
      }

      // Auto-submit if all fields are filled
      const allFilled = Array.from(otpInputs).every(inp => inp.value !== '');
      if (allFilled) otpForm.requestSubmit();
    });

    input.addEventListener('keydown', e => {
      if (e.key === 'Backspace' && !input.value && index > 0) {
        otpInputs[index - 1].focus();
      }
    });
  });
}


export default function AuthMain(){
  validateEditPermissions();
  togglePasswordVisibility();
  otpAutoNextPrevInput();
  attachInputSanitizers();
  handleLogin();
  handleSendOTP();
  handleVerifyOTP();
  handleChangePassword();
}