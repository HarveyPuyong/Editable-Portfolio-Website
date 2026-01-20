import api from "./../utils/axios-config.js";

/* ==========================================================================
   GET ACHIEVEMENTS
========================================================================== */
export const getAchievementsAPI = async () => {
  try {
    const response = await api.get("/achievement");
    if (response.status === 200) return response.data;
  } catch (err) {
    console.error("Failed to get achievements:", err);
    throw err;
  }
};


/* 
==========================================================================
   ADD ACHIEVEMENT
========================================================================== */
export const addAchievementAPI = async (data) => {
  try {
    const response = await api.post("/achievement/add", data);
    if (response.status === 201) return response.data;
  } catch (err) {
    console.error("Failed to add achievement:", err);
    throw err;
  }
};


/* 
==========================================================================
   EDIT ACHIEVEMENT
========================================================================== */
export const editAchievementAPI = async (id, data) => {
  try {
    const response = await api.put(`/achievement/edit/${id}`, data);
    if (response.status === 200) return response.data;
  } catch (err) {
    console.error("Failed to edit achievement:", err);
    throw err;
  }
};


/* 
==========================================================================
   DELETE ACHIEVEMENT
========================================================================== */
export const deleteAchievementAPI = async (id) => {
  try {
    const response = await api.delete(`/achievement/delete/${id}`);
    if (response.status === 200) return response.data;
  } catch (err) {
    console.error("Failed to delete achievement:", err);
    throw err;
  }
};
