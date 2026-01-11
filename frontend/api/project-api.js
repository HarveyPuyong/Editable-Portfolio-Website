import api from "./../utils/axios-config.js";

/* ==========================================================================
   GET PROJECTS
========================================================================== */
export const getProjectsAPI = async () => {
  try {
    const response = await api.get("/project");
    if (response.status === 200) return response.data;
  } catch (err) {
    console.error("Failed to get projects:", err);
    throw err;
  }
};

/* ==========================================================================
   ADD PROJECT
========================================================================== */
export const addProjectAPI = async (formData) => {
  try {
    const response = await api.post("/project/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.status === 201) return response.data;
  } catch (err) {
    console.error("Failed to add project:", err);
    throw err;
  }
};

/* ==========================================================================
   EDIT PROJECT
========================================================================== */
export const editProjectAPI = async (id, formData) => {
  try {
    const response = await api.put(`/project/edit/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.status === 200) return response.data;
  } catch (err) {
    console.error("Failed to edit project:", err);
    throw err;
  }
};

/* ==========================================================================
   DELETE PROJECT
========================================================================== */
export const deleteProjectAPI = async (id) => {
  try {
    const response = await api.delete(`/project/delete/${id}`);
    if (response.status === 200) return response.data;
  } catch (err) {
    console.error("Failed to delete project:", err);
    throw err;
  }
};
