import api from "./../utils/axios-config.js";

/* ==========================================================================
   GET MAIN INFO
========================================================================== */
export const getMainInfoAPI = async () => {
  try {
    const response = await api.get("/main-info/get-info");
    if (response.status === 200) return response.data;
  } catch (err) {
    console.error("Failed to get main info:", err);
    throw err;
  }
};

/* ==========================================================================
   EDIT MAIN INFO
========================================================================== */
export const editMainInfoAPI = async (formData) => {
  try {
    const response = await api.put("/main-info/change-info", formData);

    if (response.status === 200) return response.data;
  } catch (err) {
    console.error("Failed to edit main info:", err);
    throw err;
  }
};

/* ==========================================================================
   EDIT EMAIL
========================================================================== */
export const editMainEmailAPI = async (data) => {
  try {
    const response = await api.patch("/main-info/change-email", data);
    if (response.status === 200) return response.data;
  } catch (err) {
    console.error("Failed to edit email:", err);
    throw err;
  }
};
