import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

// ==========================
// Get Token
// ==========================
const getToken = () => {
  return localStorage.getItem("token");
};

// ==========================
// Auth Header
// ==========================
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// ==========================
// Get Profile
// ==========================
export const getProfile = async () => {
  const response = await axios.get(
    `${API_URL}/profile`,
    authHeader()
  );

  return response.data.user;
};

// ==========================
// Update Profile
// ==========================
export const updateProfile = async (profileData) => {
  const response = await axios.put(
    `${API_URL}/profile`,
    profileData,
    authHeader()
  );

  return response.data;
};

// ==========================
// Upload Resume
// ==========================
export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  const response = await axios.post(
    `${API_URL}/upload-resume`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// ==========================
// Analyze Resume
// ==========================
export const analyzeResume = async () => {
  const response = await axios.get(
    `${API_URL}/analyze-resume`,
    authHeader()
  );

  return response.data;
};