import AnimationMainFunction from "./animation.js"


// ================================
// SHOW MORE PROJECTS
// ================================
const showMoreProjects = () => {
  const showMoreBTN = document.querySelector('.projects-card-container__load-more-btn');
  const moreProjectsContainer = document.querySelector('.more-projects-list');

  if (!showMoreBTN || !moreProjectsContainer) return;

  showMoreBTN.addEventListener('click', () => {
    moreProjectsContainer.classList.remove('hide');
    showMoreBTN.classList.add('hide');
    // initialize animations for newly revealed project cards
    AnimationMainFunction();
    if (window.ScrollTrigger && typeof ScrollTrigger.refresh === 'function') ScrollTrigger.refresh();
  });
}


// ================================
// CHANGE SKILLS TEXT CONTENT
// ================================
const changeSkillsContent = () => {
  const displaySkills = document.querySelector('.about-section__skills');
  if (!displaySkills) return;

  const mySkills = ['Web Developer', 'Programmer', 'Content Creator'];
  const typeSpeed = 80; // ms per char when typing
  const deleteSpeed = 60; // ms per char when deleting
  const pauseAfterType = 2000; // ms to wait after a full word is typed
  const pauseAfterDelete = 500; // ms to wait after delete completes

  const delay = ms => new Promise(res => setTimeout(res, ms));

  (async function runTypingLoop() {
    while (true) {
      for (const skill of mySkills) {
        // Type
        for (let i = 1; i <= skill.length; i++) {
          displaySkills.textContent = skill.slice(0, i);
          await delay(typeSpeed);
        }
        await delay(pauseAfterType);

        // Delete
        for (let i = skill.length; i >= 0; i--) {
          displaySkills.textContent = skill.slice(0, i);
          await delay(deleteSpeed);
        }
        await delay(pauseAfterDelete);
      }
    }
  })();
}


/* ==========================================================================
   TOGGLE LOGIN FORM
   ========================================================================== */
const toggleLoginForm = () => {
    const loginForm = document.querySelector('#login-form');
    const blurBG = document.querySelector('.blur-bg');

    document.querySelector('.button-enable-edit').addEventListener('click', () => {
      loginForm.classList.remove('hide');
      blurBG.classList.remove('hide');
    });

    document.querySelector('#login-form .form__cancel-btn').addEventListener('click', () => {
      loginForm.classList.add('hide');
      blurBG.classList.add('hide');
    });
}


/* ==========================================================================
   TOGGLE OTP FORM
   ========================================================================== */
const toggleOTPForm = () => {
  const loginForm = document.querySelector('#login-form');
  const OTPForm = document.querySelector('#otp-form');

  document.querySelector('.login-form__forgot-password').
    addEventListener('click', () => {
      loginForm.classList.add('hide');
      OTPForm.classList.remove('hide');
    });

  document.querySelector('#otp-form .form__cancel-btn').
    addEventListener('click', () => {
      loginForm.classList.remove('hide');
      OTPForm.classList.add('hide');
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


// ===============================
// SWITCH TO EDIT MDOE
// ===============================
const switchToEditMode = () => {
  const saveBtn = document.querySelector(".save-btn");
  const editBtn = document.querySelector(".button-enable-edit");
  const wrapper = document.querySelector(".main-wrapper");
  const editableTexts = document.querySelectorAll('.editable-text')

  editBtn.addEventListener("click", () => {
    if (wrapper.tagName && wrapper.tagName.toLowerCase() === 'form') return;

    // create a form and copy attributes
    const form = document.createElement('form');
    form.id = 'edit-content-form';

    for (const attr of Array.from(wrapper.attributes)) {
      form.setAttribute(attr.name, attr.value);
    }

    // move children into the new form
    while (wrapper.firstChild) form.appendChild(wrapper.firstChild);
    
    // replace in DOM
    wrapper.parentNode.replaceChild(form, wrapper);

    form.classList.remove('view-mode');
    form.classList.add('edit-mode');

    editableTexts.forEach(text => {
      text.setAttribute("contenteditable", "true");
    })

    editBtn.classList.add('hide');
    saveBtn.classList.remove('hide');

    document.dispatchEvent(new Event("edit-mode"));
  });
}


document.addEventListener('edit-mode', () => {
  const editForm = document.querySelector('#edit-content-form');

  editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    window.location.reload();
  })
});


// ================================
// MAIN PAGE FUNCTION
// ================================
function MainPageFunction() {
  showMoreProjects();
  changeSkillsContent();
  // toggleLoginForm();
  toggleOTPForm();
  togglePasswordVisibility();
  otpAutoNextPrevInput();
  AnimationMainFunction();
  switchToEditMode();
} 

MainPageFunction();
