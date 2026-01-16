import {popupError} from "./../utils/popup-alert.js"

import {deleteSkillAPI} from "./../api/skill-api.js";
import { deleteAchievementAPI } from "../api/achievement-api.js";
import { deleteExperiencesAPI } from "../api/experience-api.js";
import { deleteProjectAPI } from "../api/project-api.js";
import { deleteEducationAPI } from "../api/education-api.js";
import { deleteToolAPI } from "../api/tool-api.js";

import {displayAboutSection,
        displayExperienceSection,
        displayProjectsSection,
        displayEducationSection,
        displayToolsSection} from './display-contents.js'


/* ==========================================================================
    DELETE SKILLS
   ========================================================================== */
const deleteSkill = () => {
  const deleteSkillButtons = document.querySelectorAll('.about-section__skill-input--delete-btn');

  deleteSkillButtons.forEach(button => {
    button.addEventListener('click', async() => {
      try{
        button.disabled = true;

        const id = button.dataset.id;

        await deleteSkillAPI(id);
        displayAboutSection();

      }catch(err){
        const errMessage = err?.response?.data?.message;
        popupError(errMessage);
      }finally {
        button.disabled = false;
      }
    });
  });
}


/* ==========================================================================
    DELETE ACHIEVEMENT
   ========================================================================== */
const deleteAchievement = () => {
  const deleteAchievementButtons = document.querySelectorAll('.achievements-list__achievement--delete-btn');

  deleteAchievementButtons.forEach(button => {
    button.addEventListener('click', async() => {
      try{
        button.disabled = true;
        const id = button.dataset.id;
        
        await deleteAchievementAPI(id);
        displayAboutSection();

      }catch(err){
        const errMessage = err?.response?.data?.message;
        popupError(errMessage);
      }finally {
        button.disabled = false;
      }  
    });
  });
}


/* ==========================================================================
    DELETE EXPERIENCE
   ========================================================================== */
const deleteExperience = () => {
  const deleteExperienceButtons = document.querySelectorAll('.experience-card__delete-btn');

  deleteExperienceButtons.forEach(button => {
    button.addEventListener('click', async () => {
      try {
        button.disabled = true;

        const id = button.dataset.id;
        await deleteExperiencesAPI(id);
        displayExperienceSection();

      } catch (err) {
        popupError(err?.response?.data?.message);
      } finally {
        button.disabled = false;
      }
    });
  });
};


/* ==========================================================================
    DELETE PROJECT
   ========================================================================== */
const deleteProject = () => {
  const deleteProjectButtons = document.querySelectorAll('.project-card__delete-btn');

  deleteProjectButtons.forEach(button => {
    button.addEventListener('click', async () => {
      try {
        button.disabled = true;

        const id = button.dataset.id;
        await deleteProjectAPI(id);
        displayProjectsSection();

      } catch (err) {
        popupError(err?.response?.data?.message);
      } finally {
        button.disabled = false;
      }
    });
  });
};


/* ==========================================================================
    DELETE PROJECT
   ========================================================================== */
const deleteEducation = () => {
  const deleteEducationButtons = document.querySelectorAll('.education-card__delete-btn');

  deleteEducationButtons.forEach(button => {
    button.addEventListener('click', async () => {
      try {
        button.disabled = true;

        const id = button.dataset.id;
        await deleteEducationAPI(id);
        displayEducationSection();

      } catch (err) {
        popupError(err?.response?.data?.message);
      } finally {
        button.disabled = false;
      }
    });
  });
};


/* ==========================================================================
    DELETE TOOL
   ========================================================================== */
const deleteTool = () => {
  const deleteToolButtons = document.querySelectorAll('.tool-card__delete-btn');

  deleteToolButtons.forEach(button => {
    button.addEventListener('click', async () => {
      try {
        button.disabled = true;

        const id = button.dataset.id;
        await deleteToolAPI(id);
        displayToolsSection();

      } catch (err) {
        popupError(err?.response?.data?.message);
      } finally {
        button.disabled = false;
      }
    });
  });
};



export default function DeleteContentMain () {
  document.addEventListener('displayedAboutSection', () => { deleteSkill(); deleteAchievement()});
  document.addEventListener('displayedExperienceSection', () => deleteExperience());
  document.addEventListener('displayedProjectSection', () => deleteProject());
  document.addEventListener('displayedEducationSection', () => deleteEducation());
  document.addEventListener('displayedToolsSection', () => deleteTool());
}