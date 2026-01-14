gsap.registerPlugin(ScrollTrigger);

// ----------------------------
// SELECTORS (use Set to avoid duplicates)
// ----------------------------
const TARGET_SELECTORS = new Set([
  '.section-label',
  '.email-form__input',
  '#email-form__submit-btn'
]);

// Helper to add multiple selectors
const addSelectors = (selectors = []) => {
  selectors.forEach(selector => TARGET_SELECTORS.add(selector));
};

// ----------------------------
// EVENT-BASED SELECTOR ADDING
// ----------------------------
document.addEventListener('displayedAboutSection', () => {
  addSelectors([
    '.about-section__greetings',
    '.about-section__skills',
    '.about-section__adress',
    '.about-section__about-me',
    '.achievements-list__achievement'
  ]);

  scrollElementsFadeIn(); // re-run animation for new elements
});

document.addEventListener('displayedExperienceSection', () => {
  TARGET_SELECTORS.add('.experience-card');
  scrollElementsFadeIn();
});

document.addEventListener('displayedProjectSection', () => {
  TARGET_SELECTORS.add('.project-card');
  scrollElementsFadeIn();
});

document.addEventListener('displayedEducationSection', () => {
  TARGET_SELECTORS.add('.education-card');
  scrollElementsFadeIn();
});

document.addEventListener('displayedToolsSection', () => {
  TARGET_SELECTORS.add('.tool-card');
  scrollElementsFadeIn();
});

document.addEventListener('displayedContactCards', () => {
  TARGET_SELECTORS.add('.contact-card');
  scrollElementsFadeIn();
});

// ----------------------------
// MAIN ANIMATION FUNCTION
// ----------------------------
const scrollElementsFadeIn = () => {
  const mainWrapper = document.querySelector('.main-wrapper');
  if (!mainWrapper || !mainWrapper.classList.contains('view-mode')) return;

  // Convert Set → Array → selector string
  const selectorString = [...TARGET_SELECTORS].join(',');

  const elements = Array.from(document.querySelectorAll(selectorString))
    .filter(el =>
      !el.closest('.profile-card') &&
      !el.closest('.edit-button') &&
      !el.dataset.gsapAnimated
    );

  elements.forEach(el => {
    gsap.from(el, {
      y: 70,
      opacity: 0,
      duration: 0.95,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 92.6%',
        toggleActions: 'play none none reset'
      }
    });

    // prevent duplicate animations
    el.dataset.gsapAnimated = 'true';
  });
};

// ----------------------------
// EDIT MODE CLEANUP
// ----------------------------
document.addEventListener('edit-mode', () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());

  // Clear GSAP inline styles
  gsap.set([...TARGET_SELECTORS].join(','), {
    clearProps: 'all'
  });

  // Allow animations to be re-applied later
  document
    .querySelectorAll('[data-gsap-animated]')
    .forEach(el => delete el.dataset.gsapAnimated);
});

// ----------------------------
// ENTRY POINT
// ----------------------------
export default function AnimationMainFunction() {
  scrollElementsFadeIn();
}
