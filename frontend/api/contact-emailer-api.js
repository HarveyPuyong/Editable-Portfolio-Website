import api from "./../utils/axios-config.js";

async function contactEmailerAPI (fromData) {
  try{
    const response = await api.post("/contact", fromData);
    if (response.status === 200) return response.data;

  } catch (err){
    console.error("Failed to send the email:", err);
    throw err;
  }
}

export default contactEmailerAPI