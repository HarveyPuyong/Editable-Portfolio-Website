import {popupError} from "./../utils/popup-alert.js";

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

import {editSkill, editAchievement,
        editExperience, editProject,
        editEducation, editTool} from './edit-content.js'


/*======================
  ADD SKILL
  ====================== */
const addSkill = async (e) => {
  if (e.target.closest('.about-section__add-skill-btn')) {
    const addBtn = e.target.closest('.about-section__add-skill-btn');
    addBtn.disabled = true;

    try {
      await editSkill();
      await addSkillAPI({ skillName: undefined });
      await displayAboutSection();

    } catch (err) {
      console.log('Add skill error:', err);
      popupError(err?.response?.data?.message || 'Failed to add skill');
    } finally {
      addBtn.disabled = false;
    }
  }
}

/* ======================
  ADD ACHIEVEMENT
  ====================== */
const addAchievement = async (e) => {
  if (e.target.closest('.achievements-list__add-btn')) {
    const addBtn = e.target.closest('.achievements-list__add-btn');
    addBtn.disabled = true;

    try {
      await editAchievement();
      await addAchievementAPI({ number: undefined, name: undefined });
      await displayAboutSection();

    } catch (err) {
      console.log('Add achievement error:', err);
      popupError(err?.response?.data?.message || 'Failed to add achievement');
    } finally {
      addBtn.disabled = false;
    }
  }
}

/* ======================
  ADD EXPERIENCE
  ====================== */
const addExperience  = async (e) => {
  if (e.target.closest('.experience-cards-list__add-btn')) {
    const addBtn = e.target.closest('.experience-cards-list__add-btn');
    addBtn.disabled = true;

    try {
      await editExperience();

      await addExperiencesAPI({
        title: undefined,
        company: undefined,
        dateRange: undefined,
        details: undefined,
        img: undefined
      });
      
      await displayExperienceSection();

    } catch (err) {
      console.log('Add experience error:', err);
      popupError(err?.response?.data?.message || 'Failed to add experience');
    } finally {
      addBtn.disabled = false;
    }
  }
}

/* ======================
    ADD PROJECT
  ====================== */
const addProject = async (e) => {
  if (e.target.closest('.projects-card-container__add-project-btn')) {
    const addBtn = e.target.closest('.projects-card-container__add-project-btn');
    addBtn.disabled = true;

    try {
      await editProject();

      await addProjectAPI({
        title: undefined,
        type: undefined,
        link: undefined,
        img: undefined
      });

      await displayProjectsSection();

    } catch (err) {
      console.log('Add project error:', err);
      popupError(err?.response?.data?.message || 'Failed to add project');
    } finally {
      addBtn.disabled = false;
    }
  }
}

/* ======================
    ADD EDUCATION
  ====================== */
const addEducation = async (e) => {
  if (e.target.closest('.education-card-list__add-education-btn')) {
    const addBtn = e.target.closest('.education-card-list__add-education-btn');
    addBtn.disabled = true;

    try {
      await editEducation();

      await addEducationAPI({
        title: undefined,
        institution: undefined,
        details: undefined,
        dateRange: undefined
      });

      await displayEducationSection();

    } catch (err) {
      console.log('Add education error:', err);
      popupError(err?.response?.data?.message || 'Failed to add education');
    } finally {
      addBtn.disabled = false;
    }
  }
}

/* ======================
   ADD TOOL
  ====================== */
const addTool = async (e) => {
  if (e.target.closest('.tools-card-list__add-tool-btn')) {
    const addBtn = e.target.closest('.tools-card-list__add-tool-btn');
    addBtn.disabled = true;

    try {
      await editTool();

      await addToolAPI({
        name: undefined,
        details: undefined,
        img: undefined
      });
      
      await displayToolsSection();

    } catch (err) {
      console.log('Add tool error:', err);
      popupError(err?.response?.data?.message || 'Failed to add tool');
    } finally {
      addBtn.disabled = false;
    }
  }
}


/* ===================================
   MAIN FUNCTION
  =================================== */  
export default function AddContentMain () {
  document.addEventListener('click', async (e) => {
    if (e.target.closest('.about-section__add-skill-btn')) return addSkill(e);
    
    if (e.target.closest('.achievements-list__add-btn')) return addAchievement(e);
    
    if (e.target.closest('.experience-cards-list__add-btn')) return addExperience(e);
    
    if (e.target.closest('.projects-card-container__add-project-btn')) return addProject(e);
    
    if (e.target.closest('.education-card-list__add-education-btn')) return addEducation(e);
    
    if (e.target.closest('.tools-card-list__add-tool-btn')) return addTool(e);
  });
}
