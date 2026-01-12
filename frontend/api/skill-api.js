import api from "./../utils/axios-config.js";

/* ==========================================================================
   GET SKILLS
========================================================================== */
export const getSkillsAPI = async () => {
  try {
    const response = await api.get("/skill");
    if (response.status === 200) return response.data;
  } catch (err) {
    console.error("Failed to get skills:", err);
    throw err;
  }
};


/* ==========================================================================
   ADD SKILL
========================================================================== */
export const addSkillAPI = async (data) => {
  try {
    const response = await api.post("/skill/add", data);
    if (response.status === 201) return response.data;
  } catch (err) {
    console.error("Failed to add skill:", err);
    throw err;
  }
};


/* ==========================================================================
   EDIT SKILL
========================================================================== */
export const editSkillAPI = async (id, data) => {
  try {
    const response = await api.put(`/skill/edit/${id}`, data);
    if (response.status === 200) return response.data;
  } catch (err) {
    console.error("Failed to edit skill:", err);
    throw err;
  }
};


/* ==========================================================================
   DELETE SKILL
========================================================================== */
export const deleteSkillAPI = async (id) => {
  try {
    const response = await api.delete(`/skill/delete/${id}`);
    if (response.status === 200) return response.data;
  } catch (err) {
    console.error("Failed to delete skill:", err);
    throw err;
  }
};
