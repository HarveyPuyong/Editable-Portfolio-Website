import api from "./../utils/axios-config.js";


/* ==========================================================================
   GET EXPERIENCES
========================================================================== */
export const getExperiencesAPI = async () => {
  try {
    const response = await api.get("/experience");
    if (response.status === 200) return response.data;
  } catch (err) {
    console.error("Failed to get experiences:", err);
    throw err;
  }
};


/* ==========================================================================
   ADD EXPERIENCE
========================================================================== */
export const addExperiencesAPI = async (formData) => {
  try {
    const response = await api.post("/experience/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.status === 201) return response.data;

  } catch (err) {
    console.error("Failed to add experience:", err);
    throw err;
  }
};


/* ==========================================================================
   EDIT EXPERIENCE
========================================================================== */
export const editExperiencesAPI = async (id, formData) => {
  try {
    const response = await api.put(`/experience/edit/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.status === 200) return response.data;
  } catch (err) {
    console.error("Failed to edit experience:", err);
    throw err;
  }
};


/* ==========================================================================
   DELETE EXPERIENCE
========================================================================== */
export const deleteExperiencesAPI = async (id) => {
  try {
    const response = await api.delete(`/experience/delete/${id}`);
    if (response.status === 200) return response.data;
    
  } catch (err) {
    console.error("Failed to delete experience:", err);
    throw err;
  }
};
