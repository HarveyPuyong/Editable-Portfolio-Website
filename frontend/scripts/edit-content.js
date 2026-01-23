import {editMainInfoAPI, editMainEmailAPI} from "./../api/main-info-api.js"
import {editAchievementAPI} from "./../api/achievement-api.js"
import {editSkillAPI} from "./../api/skill-api.js"
import {editExperiencesAPI} from "./../api/experience-api.js"
import {editProjectAPI} from "./../api/project-api.js"
import {editEducationAPI} from "./../api/education-api.js"
import {editToolAPI} from "./../api/tool-api.js";


// ================================
// Image Preview
// ================================
const imagePreview = () => {
  document.addEventListener('change', e => {
    if (!e.target.classList.contains('image-input')) return;

    const container = e.target.closest('.with-image-content');
    if (!container) return;

    const image = container.querySelector('.image-preview');
    const file = e.target.files[0];
    if (!file || !image) return;

    const reader = new FileReader();
    reader.onload = ev => image.src = ev.target.result;
    reader.readAsDataURL(file);
  });
}

// ==========================================
// EDIT MAIN INFO 
// ==========================================
const editMainInfo = async() => {
  const name = document.querySelector('.profile-card__name').innerText;
  const workAvailability = document.querySelector('#select-work-availability').value;
  const aboutMe = document.querySelector('.about-section__about-me').innerText;
  const contactNumber = document.querySelector('#contact-number').innerText;
  const address = document.querySelector('#address').innerText;
  const email = document.querySelector('#email').innerText;
  const sendgridApiKey = document.querySelector('#sendgrid-api-key').value;
  const instagramLink = document.querySelector('.instagram-input-link').value;
  const tiktokLink = document.querySelector('.tiktok-input-link').value;
  const youtubeLink = document.querySelector('.youtube-input-link').value;
  const facebookLink = document.querySelector('.facebook-input-link').value;
  const profileImageInput = document.querySelector('.profile-image-input');
  const cvInput = document.querySelector('#CV-upload');


  // Create FormData for Backend
  const formData = new FormData();
  formData.append("name", name);
  formData.append("workAvailability", workAvailability);
  formData.append("aboutMe", aboutMe);
  formData.append("contactNumber", contactNumber);
  formData.append("address", address);
  formData.append("sendgridApiKey", sendgridApiKey);
  formData.append("instagramLink", instagramLink);
  formData.append("tiktokLink", tiktokLink);
  formData.append("youtubeLink", youtubeLink);
  formData.append("facebookLink", facebookLink);

  if (profileImageInput.files[0]) {
    formData.append("profileImage", profileImageInput.files[0]);
  }
  if (cvInput.files[0]) {
    formData.append("cvFile", cvInput.files[0]);
  }

  try{
    await editMainInfoAPI(formData);
    await editMainEmailAPI({email});

  } catch (err){
    console.log(err);
  }
}

// ==========================================
// EDIT SKILL
// ==========================================
export const editSkill = async () => {
  const allSkills = document.querySelectorAll('.about-section__skill-input input');

  allSkills.forEach(async (skill) => {
    const skillId = skill.dataset.id;
    const skillValue = skill.value;

    try {
      await editSkillAPI(skillId, { skillName: skillValue });
    } catch (err) {
      console.log(err);
    }
  })

};

// ==========================================
// EDIT ACHIEVEMENT
// ==========================================
export const editAchievement = async () => {
  const allAchievements = document.querySelectorAll('.achievements-list__achievement');

  allAchievements.forEach(async (achievement) => {
    const achievementId = achievement.dataset.id;
    const achievementNumber =
      achievement.querySelector('.achivements-list__achievement--number')?.innerText;

    const achievementName =
      achievement.querySelector('.achivements-list__achivement--label')?.innerText;

    try {
      await editAchievementAPI(achievementId, {
        number: achievementNumber,
        name: achievementName,
      });
    } catch (err) {
      console.log(err);
    }
  });

};

// ==========================================
// EDIT EXPERIENCE
// ==========================================
export const editExperience = async () => {
  const allExperience = document.querySelectorAll('.experience-card');

  allExperience.forEach(async(experience) => {
    const experienceId = experience.dataset.id;

    const title = experience.querySelector('.experience-card__title').innerText;
    const company = experience.querySelector('.experience-card__company').innerText;
    const dateRange = experience.querySelector('.experience-card__date-range').innerText;
    const details = experience.querySelector('.experience-card__details').innerText;
    const imageInput = experience.querySelector('.image-input');

    try {
          const formData = new FormData();
        formData.append("title", title);
        formData.append("company", company);
        formData.append("dateRange", dateRange);
        formData.append("details", details);

        if (imageInput.files[0]) {
          formData.append("img", imageInput.files[0]);
        }

        await editExperiencesAPI(experienceId, formData);
    } catch (err) {
      console.log(err);
    }
  })
};

// ==========================================
// EDIT PROJECT
// ==========================================
export const editProject = async () => {
  const allProject = document.querySelectorAll('.project-card');

  allProject.forEach(async(project) => {
    const projectId = project.dataset.id;
    const title = project.querySelector('.project-card__title').innerText;
    const type = project.querySelector('.project-card__type').innerText;
    const link = project.querySelector('.profile-card__input-link').value;
    const imageInput = project.querySelector('.image-input');

    try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("type", type);
        formData.append("link", link);

        if (imageInput.files[0]) {
          formData.append("img", imageInput.files[0]);
        }

        await editProjectAPI(projectId, formData);

    } catch (err) {
      console.log(err);
    }
  })
};

// ==========================================
// EDIT EDUCATION
// ==========================================
export const editEducation = async () => {
  const allEducation = document.querySelectorAll('.education-card');

  allEducation.forEach(async (education) => {
    const educationId = education.dataset.id;
    const title = education.querySelector('.education-card__title').innerText;
    const institution = education.querySelector('.education-card__program').innerText;
    const details = education.querySelector('.education-card__details').innerText;
    const dateRange = education.querySelector('.education-card__date-range').innerText;

    const data = {title, institution, details, dateRange}

    try {
        await editEducationAPI(educationId, data);

    } catch (err) {
      console.log(err);
    }
  })
};

// ==========================================
// EDIT TOOL
// ==========================================
export const editTool = async () => {
  const allTool = document.querySelectorAll('.tool-card');

  allTool.forEach(async(tool) => {
    const toolId = tool.dataset.id;
    const name = tool.querySelector('.tool-card__name').innerText;
    const details = tool.querySelector('.tool-card__details').innerText;
    const imageInput = tool.querySelector('.image-input');

    try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("details", details);

        if (imageInput.files[0]) {
          formData.append("img", imageInput.files[0]);
        }

        await editToolAPI(toolId, formData);

    } catch (err) {
      console.log(err);
    }
  })
};


// ==========================================
// MAIN FUNCTION
// ==========================================
export function EditContentMain () {
  ['displayedToolsSection', 'displayedProjectSection', 'displayedProfileCard']
  .forEach(eventName => {
    document.addEventListener(eventName, () => imagePreview());
  });

  document.addEventListener('edit-mode', () => {
    const editForm = document.querySelector('#edit-content-form');

    editForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      try {
        await editMainInfo();
        await editSkill();
        await editAchievement();
        await editExperience();
        await editProject();
        await editEducation();
        await editTool();

        setTimeout(() => {
          window.location.reload();
        }, 2000);

      } catch (err) {
        console.error("Error saving edits:", err);
      }
    });
  });
}