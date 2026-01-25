import api from "./../utils/axios-config.js";

/* ==========================================================================
   GET EDUCATIONS
========================================================================== */
export const getEducationsAPI = async () => {
  try {
    const response = await api.get("/education");
    if (response.status === 200) return response.data;
    
  } catch (err) {
    console.error("Failed to get educations:", err);
    throw err;
  }
};

/* ==========================================================================
   ADD EDUCATION
========================================================================== */
export const addEducationAPI = async (data) => {
  try {
    const response = await api.post("/education/add", data); // JSON payload
    if (response.status === 201) return response.data;
  } catch (err) {
    console.error("Failed to add education:", err);
    throw err;
  }
};

/* ==========================================================================
   EDIT EDUCATION
========================================================================== */
export const editEducationAPI = async (id, data) => {
  try {
    const response = await api.put(`/education/edit/${id}`, data); // JSON payload
    if (response.status === 200) return response.data;
  } catch (err) {
    console.error("Failed to edit education:", err);
    throw err;
  }
};

/* ==========================================================================
   DELETE EDUCATION
========================================================================== */
export const deleteEducationAPI = async (id) => {
  try {
    const response = await api.delete(`/education/delete/${id}`);
    if (response.status === 200) return response.data;
  } catch (err) {
    console.error("Failed to delete education:", err);
    throw err;
  }
};
