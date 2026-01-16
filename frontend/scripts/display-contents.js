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
    document.dispatchEvent(new Event("displayedProfileCard"));

  }catch(err){
    console.log(err);
  }

}


// ================================
// UPDATE WORK AVAILABILITY
// ================================
const updateWorkAvailability = () => {
  document.addEventListener('displayedProfileCard', () => {
    const workAvailabilityContainer = document.querySelector('.work-availability');
    const workAvailabilityLabel = document.querySelector('.work-availability__label');

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
      <div class="about-section__skill-input" data-id="${skill._id}">
        <input type="text" value="${skill.skillName}" placeholder="Enter your skill">
        <button class="about-section__skill-input--delete-btn delete-button" data-id="${skill._id}" type="button" aria-label="Delete">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    `).join('');

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
            <button class="achievements-list__achievement--delete-btn delete-button" data-id="${ach._id}" type="button" aria-label="Delete">
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
      document.dispatchEvent(new Event("displayedAboutSection"));
    }

  } catch(err) {
    console.error(err);
  }
};


// ================================
// CHANGE SKILLS TEXT CONTENT
// ================================
const changeSkillsContent = () => {
  document.addEventListener('displayedAboutSection', async () => {
    try {
      const skillsData = await getSkillsAPI();
      const mySkills = skillsData.skills; 

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


/* ==========================================================================
  DISPLAY EXPERIENCE SECTION
========================================================================== */
const displayExperienceSection = async () => {
  try{
    const experienceData = await getExperiencesAPI();
    const expriences = experienceData.experiences;

    let experienceCardHTML = '';

    expriences.forEach(experience => {
      experienceCardHTML += `
        <div class="experience-card">
          <button class="experience-card__delete-btn delete-button" data-id=${experience._id} type="button" aria-label="Delete">
            <i class="fa-solid fa-xmark"></i>
          </button>

          <div class="experince-card__top-area">
            <div class="experince-card__img-title-container">
              <div class="experience-card__img-container">
                <input type="file" id="experience-card__img-input" accept="image/*" hidden>
                <label for="experience-card__img-input" class="experience-card__img--input-icon" title="Upload-Image">
                  <i class="fa-solid fa-camera"></i>
                </label>
                
                <img src="${experience.img}" alt="icon">
              </div>
              
              <div class="experience-card__title-and-company">
                <p class="editable-text experience-card__title" data-target="experience-card__title-input">${experience.title}</p>
                <input type="hidden" name="experience-card__title-input" id="experience-card__title-input">

                <p class="editable-text experience-card__company" data-target="experience-card__company-input">${experience.company}</p>
                <input type="hidden" name="experience-card__company-input" id="experience-card__company-input">
              </div>
            </div>
            
            <p class="editable-text experience-card__date-range" data-target="experience-card__date-range-input">${experience.dateRange}</p>
            <input type="hidden" name="experience-card__date-range-input" id="experience-card__date-range-input">
          </div>

          <div class="experience-card__line"></div>

          <p class="editable-text experience-card__details" data-target="experience-card__details-input">${experience.details}</p>
          <input type="hidden" name="experience-card__details-input" id="experience-card__details-input">
        </div>
      `
    });

    // Insert the add button in the card-list
    experienceCardHTML += `
      <button class="add-content-btn experience-cards-list__add-btn" type="button">
        Add Experience
      </button>
    `;

    const experienceSectionContainer = document.querySelector('.experience-cards-list') 

    // Inject into the DOM
    if (experienceSectionContainer) {
      experienceSectionContainer.innerHTML = experienceCardHTML;
      document.dispatchEvent(new Event("displayedExperienceSection"));
    }

  } catch(err){
    console.log(err);
  }
}


/* ==========================================================================
  DISPLAY PROJECTS SECTION
========================================================================== */
const displayProjectsSection = async () => {
  try {
    const projectsData = await getProjectsAPI();
    const projects = projectsData.projects;

    const projectList = document.querySelector('.project-list');
    const moreProjectsList = document.querySelector('.more-projects-list');

    if (!projectList || !moreProjectsList) return;

    let projectListHTML = '';
    let moreProjectsHTML = '';

    projects.forEach((project, index) => {
      const projectCardHTML = `
        <div class="project-card">
          <button class="project-card__delete-btn delete-button" data-id=${project._id} type="button">
            <i class="fa-solid fa-xmark"></i>
          </button>

          <div class="project-card__img-container">
            <input type="file" accept="image/*" hidden>
            <label class="project-card__img-container--input-icon">
              <i class="fa-solid fa-camera"></i>
            </label>

            <img class="project-card__img" src="${project.img}" alt="project-image">
          </div>

          <div class="project-card__details">
            <div class="project-card__details--name-and-about">
              <p class="editable-text project-card__title">${project.title}</p>
              <p class="editable-text project-card__type">${project.type}</p>
            </div>

            <div class="project-card__arrow">
              <i class="project-card__arrow--icon one bi bi-arrow-up-right"></i>
              <i class="project-card__arrow--icon two bi bi-arrow-up-right"></i>
            </div>

            <input
              class="profile-card__input-link"
              type="text"
              value="${project.link || ''}"
              placeholder="Enter your project link"
            >
          </div>
        </div>
      `;

      if (index < 4) {
        projectListHTML += projectCardHTML;
      } else {
        moreProjectsHTML += projectCardHTML;
      }
    });

    projectList.innerHTML = projectListHTML;

    // keep Add Project button at the bottom
    moreProjectsList.innerHTML =
      moreProjectsHTML +
      `
        <button class="add-content-btn projects-card-container__add-project-btn" type="button">
          Add Project
        </button>
      `;

    document.dispatchEvent(new Event("displayedProjectSection"));

  } catch (err) {
    console.error(err);
  }
};


/* ==========================================================================
  DISPLAY EDUCATION SECTION
========================================================================== */
const displayEducationSection = async () => {
  try{
    const educationData = await getEducationsAPI();
    const educations = educationData.educations;
    
    let educationCardHTML = '';

    educations.forEach(education => {
      educationCardHTML += `
        <div class="education-card">
          <button class="education-card__delete-btn delete-button" data-id=${education._id} type="button" aria-label="Delete">
            <i class="fa-solid fa-xmark"></i>
          </button>

          <div class="education-card__top-area">
            <div class="education-card__title-and-institution">
              <h3 class="editable-text education-card__title" data-target="education-card__title-input">${education.title}</h3>
              <input type="hidden" name="education-card__title-input" id="education-card__title-input">

              <p class="education-card__institution">
                <span class="editable-text education-card__program" data-target="education-card__program-input">${education.institution}</span>
                <input type="hidden" name="education-card__program-input" id="education-card__program-input">
              </p>
            </div>

            <p class="editable-text education-card__date-range" data-target="education-card__date-range-input">${education.dateRange}</p>
            <input type="hidden" name="education-card__date-range-input" id="education-card__date-range-input">
          </div>

          <div class="education-card__line"></div>

          <p class="editable-text education-card__details" data-target="education-card__details-input">${education.details}</p>
          <input type="hidden" name="education-card__details-input" id="education-card__details-input">
        </div>`
    });

    // Insert the add button in the of education-list
    educationCardHTML += `<button class="add-content-btn education-card-list__add-education-btn" type="button">Add Education</button>`;

    const educationCardContainer = document.querySelector('.education-card-list');

    if(educationCardContainer){
      educationCardContainer.innerHTML = educationCardHTML;
      document.dispatchEvent(new Event("displayedEducationSection"));
    }

  }catch(err) {
    console.log(err);
  }
}


/* ==========================================================================
  DISPLAY TOOLS SECTION
========================================================================== */
const displayToolsSection = async () => {
  try{
    const toolsData = await getToolsAPI();
    const tools = toolsData.tools;

    console.log(tools);

    let toolCardHTML = '';

    tools.forEach(tool => {
      toolCardHTML += `
        <div class="tool-card">
          <button class="tool-card__delete-btn delete-button" data-id=${tool._id} type="button" aria-label="Delete">
            <i class="fa-solid fa-xmark"></i>
          </button>

          <div class="tool-card__icon-container">
            <input type="file" id="tool-img-input" accept="image/*" hidden>
            <label for="tool-img-input" class="tool-card__img-input-icon" title="Upload-Image">
              <i class="fa-solid fa-camera"></i>
            </label>

            <img class="tool-card__icon" src="${tool.img}" alt="icon">
          </div>

          <div class="tool-card__details">
            <p class="editable-text tool-card__name" data-target="tool-card__name-input">${tool.name}</p>
            <input type="hidden" name="tool-card__name-input" id="tool-card__name-input">

            <p class="editable-text tool-card__details" data-target="tool-card__details-input">${tool.details}</p>
            <input type="hidden" name="tool-card__details-input" id="tool-card__details-input">
          </div>
        </div>
      `
    });

    toolCardHTML += `<button class="add-content-btn tools-card-list__add-tool-btn" type="button">Add Tool</button>`;

    const toolCardContainer = document.querySelector('.tools-card-list');

    if(toolCardContainer){
      toolCardContainer.innerHTML = toolCardHTML;
      document.dispatchEvent(new Event("displayedToolsSection"));
    }

  }catch(err) {
    console.log(err);
  }
}


/* ==========================================================================
  DISPLAY CONTACT CARDS 
========================================================================== */
const displayContactCards = async () => {
  try{
    const mainInfoData = await getMainInfoAPI();
    console.log(mainInfoData);

    const contactCardHTML = `
      <div class="contact-card">
        <i class="contact-card-icon bi bi-telephone"></i>
        <div class="contact-card__details">
          <p class="contact-card__label">Contact No.</p>
          <p class="editable-text contact-card__value" data-target="contact-number-input">${mainInfoData.info.contactNumber}</p>
          <input type="hidden" name="contact-number-input" id="contact-number-input">
        </div>
      </div>
      <div class="contact-card">
        <i class="contact-card-icon bi bi-telephone"></i>
        <div class="contact-card__details">
          <p class="contact-card__label">Email</p>
          <p class="editable-text contact-card__value" data-target="contact-email-input">${mainInfoData.email}</p>
          <input type="hidden" name="contact-email-input" id="contact-email-input">
        </div>

      </div>
      <div class="contact-card">
        <i class="contact-card-icon bi bi-telephone"></i>
        <div class="contact-card__details">
          <p class="contact-card__label">Address</p>
          <p class="editable-text contact-card__value" data-target="contact-adress-input">${mainInfoData.info.address}</p>
          <input type="hidden" name="contact-adress-input" id="contact-adress-input">
        </div>
      </div>
    `;

    const contactCardContainer = document.querySelector('.contact-card-list');

    if(contactCardContainer){
      contactCardContainer.innerHTML = contactCardHTML;
      document.dispatchEvent(new Event("displayedContactCards"));
    }

  }catch(err) {
    console.log(err);
  }
}



function DisplayContentMain () {
  displayProfileCard();
  updateWorkAvailability();
  displayAboutSection();
  changeSkillsContent();
  displayExperienceSection();
  displayProjectsSection();
  displayEducationSection();
  displayToolsSection();
  displayContactCards();
}


export { DisplayContentMain,
         displayAboutSection,
         displayExperienceSection,
         displayProjectsSection,
         displayEducationSection,
         displayToolsSection,
         displayContactCards};

