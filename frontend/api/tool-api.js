import api from "./../utils/axios-config.js";

/* ==========================================================================
   GET TOOLS
========================================================================== */
export const getToolsAPI = async () => {
  try {
    const response = await api.get("/tool");
    if (response.status === 200) return response.data;
  } catch (err) {
    console.error("Failed to get tools:", err);
    throw err;
  }
};

/* ==========================================================================
   ADD TOOL
========================================================================== */
export const addToolAPI = async (formData) => {
  try {
    const response = await api.post("/tool/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.status === 201) return response.data;
  } catch (err) {
    console.error("Failed to add tool:", err);
    throw err;
  }
};

/* ==========================================================================
   EDIT TOOL
========================================================================== */
export const editToolAPI = async (id, formData) => {
  try {
    const response = await api.put(`/tool/edit/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.status === 200) return response.data;
  } catch (err) {
    console.error("Failed to edit tool:", err);
    throw err;
  }
};

/* ==========================================================================
   DELETE TOOL
========================================================================== */
export const deleteToolAPI = async (id) => {
  try {
    const response = await api.delete(`/tool/delete/${id}`);
    if (response.status === 200) return response.data;
  } catch (err) {
    console.error("Failed to delete tool:", err);
    throw err;
  }
};
