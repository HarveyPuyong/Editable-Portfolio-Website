import { popupError } from "./../utils/popup-alert.js";

import { deleteSkillAPI } from "./../api/skill-api.js";
import { deleteAchievementAPI } from "../api/achievement-api.js";
import { deleteExperiencesAPI } from "../api/experience-api.js";
import { deleteProjectAPI } from "../api/project-api.js";
import { deleteEducationAPI } from "../api/education-api.js";
import { deleteToolAPI } from "../api/tool-api.js";

import { displayAboutSection, displayExperienceSection,
        displayProjectsSection, displayEducationSection,
        displayToolsSection
} from './display-contents.js';

import {editSkill, editAchievement,
        editExperience, editProject,
        editEducation, editTool} from './edit-content.js'


/* ======================
   DELETE SKILL
====================== */
const deleteSkill = async (e) => {
  if (e.target.closest('.about-section__skill-input--delete-btn')) {
    const btn = e.target.closest('.about-section__skill-input--delete-btn');
    btn.disabled = true;
    try {
      await editSkill();
      await deleteSkillAPI(btn.dataset.id);
      await displayAboutSection();

    } catch (err) {
      console.log('Delete skill error:', err);
      popupError(err?.response?.data?.message || 'Failed to delete skill');
    } finally {
      btn.disabled = false;
    }
  }
};

/* ======================
   DELETE ACHIEVEMENT
====================== */
const deleteAchievement = async (e) => {
  if (e.target.closest('.achievements-list__achievement--delete-btn')) {
    const btn = e.target.closest('.achievements-list__achievement--delete-btn');
    btn.disabled = true;
    try {
      await editAchievement();
      await deleteAchievementAPI(btn.dataset.id);
      await displayAboutSection();
      
    } catch (err) {
      console.log('Delete achievement error:', err);
      popupError(err?.response?.data?.message || 'Failed to delete achievement');
    } finally {
      btn.disabled = false;
    }
  }
};

/* ======================
   DELETE EXPERIENCE
====================== */
const deleteExperience = async (e) => {
  if (e.target.closest('.experience-card__delete-btn')) {
    const btn = e.target.closest('.experience-card__delete-btn');
    btn.disabled = true;
    try {
      await editExperience();
      await deleteExperiencesAPI(btn.dataset.id);
      await displayExperienceSection();

    } catch (err) {
      console.log('Delete experience error:', err);
      popupError(err?.response?.data?.message || 'Failed to delete experience');
    } finally {
      btn.disabled = false;
    }
  }
};

/* ======================
   DELETE PROJECT
====================== */
const deleteProject = async (e) => {
  if (e.target.closest('.project-card__delete-btn')) {
    const btn = e.target.closest('.project-card__delete-btn');
    btn.disabled = true;

    try {
      await editProject();
      await deleteProjectAPI(btn.dataset.id);
      await displayProjectsSection();

    } catch (err) {
      console.log('Delete project error:', err);
      popupError(err?.response?.data?.message || 'Failed to delete project');
    } finally {
      btn.disabled = false;
    }
  }
};

/* ======================
   DELETE EDUCATION
====================== */
const deleteEducation = async (e) => {
  if (e.target.closest('.education-card__delete-btn')) {
    const btn = e.target.closest('.education-card__delete-btn');
    btn.disabled = true;

    try {
      await editEducation();
      await deleteEducationAPI(btn.dataset.id);
      await displayEducationSection();

    } catch (err) {
      console.log('Delete education error:', err);
      popupError(err?.response?.data?.message || 'Failed to delete education');
    } finally {
      btn.disabled = false;
    }
  }
};

/* ======================
   DELETE TOOL
====================== */
const deleteTool = async (e) => {
  if (e.target.closest('.tool-card__delete-btn')) {
    const btn = e.target.closest('.tool-card__delete-btn');
    btn.disabled = true;
    try {
      await editTool();
      await deleteToolAPI(btn.dataset.id);
      await displayToolsSection();

    } catch (err) {
      console.log('Delete tool error:', err);
      popupError(err?.response?.data?.message || 'Failed to delete tool');
    } finally {
      btn.disabled = false;
    }
  }
};


/* ======================
   MAIN FUNCTION
====================== */
export default function DeleteContentMain() {
  document.addEventListener('click', async (e) => {
    if (e.target.closest('.about-section__skill-input--delete-btn')) return deleteSkill(e);
    if (e.target.closest('.achievements-list__achievement--delete-btn')) return deleteAchievement(e);
    if (e.target.closest('.experience-card__delete-btn')) return deleteExperience(e);
    if (e.target.closest('.project-card__delete-btn')) return deleteProject(e);
    if (e.target.closest('.education-card__delete-btn')) return deleteEducation(e);
    if (e.target.closest('.tool-card__delete-btn')) return deleteTool(e);
  });
}
