gsap.registerPlugin(ScrollTrigger);

// ----------------------------
// SELECTORS
// ----------------------------
const TARGET_SELECTORS = new Set([
  '.section-label',
  '.email-form__input',
  '#email-form__submit-btn'
]);

const addSelectors = (selectors = []) => {
  selectors.forEach(s => TARGET_SELECTORS.add(s));
};

// ----------------------------
// EVENT LISTENERS
// ----------------------------
document.addEventListener('displayedAboutSection', () => {
  addSelectors([
    '.about-section__greetings',
    '.about-section__skills',
    '.about-section__adress',
    '.about-section__about-me',
    '.achievements-list__achievement'
  ]);
  animateNewElements();
});

document.addEventListener('displayedExperienceSection', () => {
  addSelectors(['.experience-card']);
  animateNewElements();
});

document.addEventListener('displayedProjectSection', () => {
  addSelectors(['.project-card']);
  animateNewElements();
});

document.addEventListener('displayedEducationSection', () => {
  addSelectors(['.education-card']);
  animateNewElements();
});

document.addEventListener('displayedToolsSection', () => {
  addSelectors(['.tool-card']);
  animateNewElements();
});

document.addEventListener('displayedContactCards', () => {
  addSelectors(['.contact-card']);
  animateNewElements();
});

// ----------------------------
// CORE ANIMATION
// ----------------------------
function animateNewElements() {
  const mainWrapper = document.querySelector('.main-wrapper');
  if (!mainWrapper || !mainWrapper.classList.contains('view-mode')) return;

  const selector = [...TARGET_SELECTORS].join(',');

  const elements = document.querySelectorAll(selector);

  elements.forEach(el => {
    if (
      el.dataset.animated ||
      el.closest('.profile-card') ||
      el.closest('.edit-button')
    ) return;

    gsap.from(el, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 91%',
        toggleActions: 'play none none reset'
      }
    });

    el.dataset.animated = 'true';
  });

  ScrollTrigger.refresh();
}

// ----------------------------
// EDIT MODE CLEANUP
// ----------------------------
document.addEventListener('edit-mode', () => {
  ScrollTrigger.getAll().forEach(t => t.kill());

  gsap.set([...TARGET_SELECTORS].join(','), {
    clearProps: 'all'
  });

  document
    .querySelectorAll('[data-animated]')
    .forEach(el => delete el.dataset.animated);
});

// ----------------------------
// INITIAL RUN
// ----------------------------
export default function AnimationMainFunction() {
  animateNewElements();
}
