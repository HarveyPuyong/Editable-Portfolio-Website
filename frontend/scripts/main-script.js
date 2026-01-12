import AnimationMainFunction from "./animation.js";
import AuthMain from "./auth.js";
import DisplayContentMain from "./display-contents.js"


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
function MainScriptFunction() {
  DisplayContentMain();
  AuthMain();
  AnimationMainFunction();

  showMoreProjects();
  toggleLoginForm();
  toggleOTPForm();
} 

MainScriptFunction();
