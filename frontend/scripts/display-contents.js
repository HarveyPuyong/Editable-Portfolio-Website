import {getMainInfoAPI} from "./../api/main-info-api.js"
import {getSkillsAPI} from "./../api/skill-api.js"
import {getAchievementsAPI} from "./../api/achievement-api.js"
import {getExperiencesAPI} from "./../api/experience-api.js"
import {getProjectsAPI} from "./../api/project-api.js"
import {getEducationsAPI} from "./../api/education-api.js"
import {getToolsAPI} from "./../api/tool-api.js"


/* ==========================================================================
  DISPLAY PROFILE CARD
========================================================================== */
const displayProfileCard = async () => {
  try{
    const data = await getMainInfoAPI();

    const profileCardHTML = `
      <div class="profile-card__img-container">
        <input type="file" id="profileImageInput" accept="image/*" hidden>
        <label for="profileImageInput" class="profile-card__img-container--input-icon" title="Upload-Image">
          <i class="fa-solid fa-camera"></i>
        </label>

        <img class="profile-card__image" src="${data.info.profileImage}" alt="profile-image">
      </div>
      
      <div class="profile-card__details">
        <select name="select-work-availability" id="select-work-availability">
          <option value="">Select Work Availabilty</option>
          <option value="available">Available for work</option>
          <option value="unavailable">Unavailable for work</option>
        </select>

        <div class="work-availability ${data.info.workAvailability}">
          <span class="work-availability__dot-status"></span>
          <p class="work-availability__label">Available for work</p>
        </div>

        <div class="profile-card__name editable-text" data-target="name-input"> ${data.info.name} </div>
        <input type="hidden" name="name-input" id="name-input">

        <div class="social-list-inputs">
          <input class="instagram-input-link" type="text" placeholder="Enter instagram link">
          <input class="tiktok-input-link" type="text" placeholder="Enter tiktok link">
          <input class="youtube-input-link" type="text" placeholder="Enter youtube link">
          <input class="facebook-input-link" type="text" placeholder="Enter facebook link">
        </div>

        <div class="profile-card__social-list">
          <a href="${data.info.instagramLink}" class="profile-card__social-list--img">
            <img class="profile-card__social-list--img-icon" src="images-and-icons/instagram.png" alt="instagram-img">
          </a>
          <a href="${data.info.tiktokLink}" class="profile-card__social-list--img">
            <img class="profile-card__social-list--img-icon" src="images-and-icons/tiktok.png" alt="tiktok-icon">
          </a>
          <a href="${data.info.youtubeLink}" class="profile-card__social-list--img">
            <img class="profile-card__social-list--img-icon" src="images-and-icons/youtube.png" alt="youtube-icon">
          </a>
          <a href="${data.info.facebookLink}" class="profile-card__social-list--img"> 
            <img class="profile-card__social-list--img-icon" src="images-and-icons/facebook.png" alt="facebook-icon">
          </a>
        </div>

        <div class="profile-card__buttons-container">
          <input id="CV-upload" type="file" type="file" accept=".pdf,.doc,.docx" hidden>
          <label for="CV-upload" class="profile-card__btn upload-cv-btn" title="Upload-CV">
            <i class="fa-solid fa-upload"></i>
            <span class="profile-card__btn--label">Upload CV</span>
          </label>
            
          <a href="${data.info.cvFile}" download class="profile-card__btn download-cv-btn">
            <i class="profile-card__btn--icon fas fa-download"></i>
            <p class="profile-card__btn--label">Download CV</p>
          </a>
          
          <a href="#contact-section" class="profile-card__btn contact-me-btn">
            <img class="profile-card__btn--icon" src="images-and-icons/contact-icon.png" alt="contact-icon">
            <p class="profile-card__btn--label">Contact Me</p>
          </a>
        </div>
      </div>
    `;

    document.getElementById('profile-card').innerHTML = profileCardHTML;
    document.dispatchEvent(new Event("displayedContent"));

  }catch(err){
    console.log(err);
  }

}


/* ==========================================================================
   UPDATE WORK AVAILABILITY
========================================================================== */
const updateWorkAvailability = () => {
  document.addEventListener('displayedContent', () => {
    const workAvailabilityContainer = document.querySelector('.work-availability');
    const workAvailabilityLabel = document.querySelector('.work-availability__label');

    console.log(workAvailabilityContainer.classList)

    if(workAvailabilityContainer.classList.contains('available')) workAvailabilityLabel.innerText = 'Available For Work';
    else workAvailabilityLabel.innerText = 'Unavailable For Work';
  });
}


/* ==========================================================================
  DISPLAY ABOUT SECTION
========================================================================== */
const displayAboutSection = async () => {
  try {
    const skillsData = await getSkillsAPI();
    const mainInfoData = await getMainInfoAPI();
    const achievementsData = await getAchievementsAPI();

    // Get the skills array
    const skills = skillsData.skills; 

    // Generate HTML for each skill input dynamically
    const skillInputsHTML = skills.map(skill => `
      <div class="about-section__skill-input">
        <input type="text" value="${skill.skillName}" placeholder="Enter your skill">
        <button class="about-section__skill-input--delete-btn delete-button" type="button" aria-label="Delete">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    `).join('');

    console.log(skills);


    // Full About Section HTML
    const aboutSectionHTML = `
      <h2 class="about-section__greetings">I'm ${mainInfoData.info.name},</h2>
      <h3 class="about-section__skills"></h3>
      
      <div class="about-section__skills-inputs-list">
        ${skillInputsHTML}
        <button class="about-section__add-skill-btn add-content-btn" type="button">Add Skill</button>
      </div>

      <!-- address input -->
      <p class="about-section__adress">
        From ${mainInfoData.info.address}
      </p>

      <!-- about me input -->
      <div class="editable-text about-section__about-me" data-target="about-input">${mainInfoData.info.aboutMe || ''}</div>
      <input type="hidden" name="about-input" id="about-input">

      <!-- achievement list -->
      <div class="achievements-list">
        ${achievementsData.achievements.map(ach => `
          <div class="achievements-list__achievement">
            <button class="achievements-list__achievement--delete-btn delete-button" type="button" aria-label="Delete">
              <i class="fa-solid fa-xmark"></i>
            </button>

            <div class="editable-text achivements-list__achievement--number" data-target="achievement-number-input">${ach.number}<span>+</span></div>
            <input type="hidden" name="achievement-number-input" id="achievement-number-input">

            <div class="editable-text achivements-list__achivement--label" data-target="achievement-label-input">${ach.name}</div>
            <input type="hidden" name="achievement-label-input" id="achievement-label-input">
          </div>
        `).join('')}

        <button class="achievements-list__add-btn add-content-btn" type="button">Add Achievement</button>
      </div>
    `;

    // Inject into the DOM
    const aboutSectionContainer = document.getElementById('about-section');
    if (aboutSectionContainer) {
      aboutSectionContainer.innerHTML = aboutSectionHTML;
      document.dispatchEvent(new Event("displayedContent"));
    }

  } catch(err) {
    console.error(err);
  }
};


// ================================
// CHANGE SKILLS TEXT CONTENT
// ================================
const changeSkillsContent = () => {
  document.addEventListener('displayedContent', async () => {
    try {
      const skillsData = await getSkillsAPI();
      const mySkills = skillsData.skills; 

      console.log(mySkills)

      const displaySkills = document.querySelector('.about-section__skills');
      if (!displaySkills) return;

      // no skills → hide text
      if (!Array.isArray(mySkills) || mySkills.length === 0) {
        displaySkills.style.display = 'none';
        return;
      } else {
        displaySkills.style.display = 'inline-block';
      }

      const typeSpeed = 80;        // ms per char when typing
      const deleteSpeed = 60;      // ms per char when deleting
      const pauseAfterType = 2000; // ms to wait after a full word is typed
      const pauseAfterDelete = 500;// ms to wait after delete completes

      const delay = ms => new Promise(res => setTimeout(res, ms));

      // ============================
      // Loop forever over skills
      // ============================
      (async function runTypingLoop() {
        let index = 0;

        while (true) {
          const skillObj = mySkills[index];
          if (!skillObj || !skillObj.skillName) {
            index = (index + 1) % mySkills.length;
            continue;
          }

          const skill = skillObj.skillName;

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

          // Move to next skill (even if there's only 1, it loops correctly)
          index = (index + 1) % mySkills.length;
        }
      })();

    } catch (err) {
      console.error(err);
    }
  });
};




export default function DisplayContentMain () {
  displayProfileCard();
  updateWorkAvailability();
  displayAboutSection();
  changeSkillsContent();
}