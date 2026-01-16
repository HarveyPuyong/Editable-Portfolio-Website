import {popupError} from "./../utils/popup-alert.js"

import {addSkillAPI} from "./../api/skill-api.js";
import { addAchievementAPI } from "../api/achievement-api.js";
import { addExperiencesAPI } from "../api/experience-api.js";
import { addProjectAPI } from "../api/project-api.js";
import { addEducationAPI } from "../api/education-api.js";
import { addToolAPI } from "../api/tool-api.js";

import {displayAboutSection,
        displayExperienceSection,
        displayProjectsSection,
        displayEducationSection,
        displayToolsSection} from './display-contents.js'


/* ==========================================================================
   ADD SKILL
   ========================================================================== */
const addSkill = () => {
  const addSkillBtn = document.querySelector('.about-section__add-skill-btn');

  addSkillBtn.addEventListener('click', async() => {
    try{
      addSkillBtn.disabled = true;
      await addSkillAPI({skillName: undefined});
      displayAboutSection();
      addSkillBtn.disabled = false;

    }catch(err) {
      const errMessage = err?.response?.data?.message;
      popupError(errMessage);

    }finally {
      addSkillBtn.disabled = false;
    }
  });
}

/* ==========================================================================
    ADD ACHIEVEMENT
   ========================================================================== */
const addAchievement = () => {
  const addAchievementBtn = document.querySelector('.achievements-list__add-btn');

  addAchievementBtn.addEventListener('click', async() => {
    try{
      addAchievementBtn.disabled = true;

      await addAchievementAPI({number:undefined, name:undefined});
      displayAboutSection();
      addAchievementBtn.disabled = false;

    }catch(err) {
      const errMessage = err?.response?.data?.message;
      popupError(errMessage);

    }finally {
      addAchievementBtn.disabled = false;
    }
  });
}

/* ==========================================================================
    ADD EXPERIENCE
   ========================================================================== */
const addExperience = () => {
  const addExperienceBtn = document.querySelector('.experience-cards-list__add-btn');

  addExperienceBtn.addEventListener('click', async() => {
    try{
      addExperienceBtn.disabled = true;

      const data = {title:undefined, company:undefined, dateRange:undefined, details:undefined}

      await addExperiencesAPI(data);
      displayExperienceSection();
      addExperienceBtn.disabled = false;

    }catch(err) {
      const errMessage = err?.response?.data?.message;
      popupError(errMessage);

    }finally {
      addExperienceBtn.disabled = false;
    }
  });
}

/* ==========================================================================
    ADD PROJECT
   ========================================================================== */
const addProject = () => {
  const addProjectBtn = document.querySelector('.projects-card-container__add-project-btn');

  addProjectBtn.addEventListener('click', async() => {
    try{
      addProjectBtn.disabled = true;

      const data = {title:undefined, type:undefined, link:undefined, img:undefined}

      await addProjectAPI(data);
      displayProjectsSection();
      addProjectBtn.disabled = false;

    }catch(err) {
      const errMessage = err?.response?.data?.message;
      popupError(errMessage);

    }finally {
      addProjectBtn.disabled = false;
    }
  });
}

/* ==========================================================================
    ADD EDUCATION
   ========================================================================== */
const addEducation = () => {
  const addEducationBtn = document.querySelector('.education-card-list__add-education-btn');

  addEducationBtn.addEventListener('click', async() => {
    try{
      addEducationBtn.disabled = true;

      const data = {title:undefined, institution:undefined, details:undefined, dateRange:undefined}

      await addEducationAPI(data);
      displayEducationSection();
      addEducationBtn.disabled = false;

    }catch(err) {
      const errMessage = err?.response?.data?.message;
      popupError(errMessage);

    }finally {
      addEducationBtn.disabled = false;
    }
  });
}

/* ==========================================================================
    ADD EDUCATION
   ========================================================================== */
const addTool = () => {
  const addToolBtn = document.querySelector('.tools-card-list__add-tool-btn');

  addToolBtn.addEventListener('click', async() => {
    try{
      addToolBtn.disabled = true;

      const data = {name:undefined, details:undefined, img:undefined}

      await addToolAPI(data);
      displayToolsSection();
      addToolBtn.disabled = false;

    }catch(err) {
      const errMessage = err?.response?.data?.message;
      popupError(errMessage);

    }finally {
      addToolBtn.disabled = false;
    }
  });
}


/* ==========================================================================
    MAIN FUNCTION
   ========================================================================== */
export default function AddContentMain () {
  document.addEventListener('displayedAboutSection', () => { addSkill(); addAchievement();});
  document.addEventListener('displayedExperienceSection', () => addExperience());
  document.addEventListener('displayedProjectSection', () => addProject());
  document.addEventListener('displayedEducationSection', () => addEducation());
  document.addEventListener('displayedToolsSection', () => addTool());
}