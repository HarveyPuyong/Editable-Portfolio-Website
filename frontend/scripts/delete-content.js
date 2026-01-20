import { popupError } from "./../utils/popup-alert.js";

import { deleteSkillAPI } from "./../api/skill-api.js";
import { deleteAchievementAPI } from "../api/achievement-api.js";
import { deleteExperiencesAPI } from "../api/experience-api.js";
import { deleteProjectAPI } from "../api/project-api.js";
import { deleteEducationAPI } from "../api/education-api.js";
import { deleteToolAPI } from "../api/tool-api.js";

import {
  displayAboutSection,
  displayExperienceSection,
  displayProjectsSection,
  displayEducationSection,
  displayToolsSection
} from './display-contents.js';


/* ======================
   DELETE SKILL
====================== */
const deleteSkill = async (e) => {
  if (e.target.closest('.about-section__skill-input--delete-btn')) {
    const btn = e.target.closest('.about-section__skill-input--delete-btn');
    btn.disabled = true;
    try {
      await deleteSkillAPI(btn.dataset.id);
      displayAboutSection();
    } catch (err) {
      console.log(err);
      popupError(err?.response?.data?.message);
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
      await deleteAchievementAPI(btn.dataset.id);
      displayAboutSection();
    } catch (err) {
      console.log(err);
      popupError(err?.response?.data?.message);
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
      await deleteExperiencesAPI(btn.dataset.id);
      displayExperienceSection();
    } catch (err) {
      console.log(err);
      popupError(err?.response?.data?.message);
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
      await deleteProjectAPI(btn.dataset.id);
      displayProjectsSection();
    } catch (err) {
      console.log(err);
      popupError(err?.response?.data?.message);
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
      await deleteEducationAPI(btn.dataset.id);
      displayEducationSection();
    } catch (err) {
      console.log(err);
      popupError(err?.response?.data?.message);
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
      await deleteToolAPI(btn.dataset.id);
      displayToolsSection();
    } catch (err) {
      console.log(err);
      popupError(err?.response?.data?.message);
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
