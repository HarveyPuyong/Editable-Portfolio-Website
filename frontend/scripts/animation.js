gsap.registerPlugin(ScrollTrigger);

const TARGET_SELECTORS = [
  '.about-section__greetings',
  '.about-section__skills',
  '.about-section__adress',
  '.about-section__about-me',
  '.section-label',
  '.achievements-list__achievement',
  '.experience-card',
  '.project-card',
  '.education-card',
  '.tool-card',
  '.contact-card',
  '.email-form__input',
  '#email-form__submit-btn'
];

const scrollElementsFadeIn = () => {
  const elements = Array.from(document.querySelectorAll(TARGET_SELECTORS.join(',')))
    .filter(el => !el.closest('.profile-card') && !el.closest('.edit-button') && !el.dataset.gsapAnimated);

  elements.forEach(el => {
    gsap.from(el, {
      y: 70,
      scrollTrigger: {
        trigger: el,
        start: "top 92.6%",
        toggleActions: "play none none reset",
      },
      opacity: 0,
      duration: 0.95,
      ease: "power2.out"
    });
    // mark element as initialized so we don't attach another animation later
    el.dataset.gsapAnimated = 'true';
  });
}

export default function AnimationMainFunction(){
  scrollElementsFadeIn();
}