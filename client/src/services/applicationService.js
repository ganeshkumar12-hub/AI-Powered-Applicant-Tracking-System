import axios from "axios";

const API_URL = "http://localhost:5000/api/applications";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const applyForJob = async (jobId) => {
  const response = await axios.post(
    API_URL,
    { jobId },
    getAuthHeader()
  );

  return response.data;
};

export const getMyApplications = async () => {
  const response = await axios.get(
    `${API_URL}/my-applications`,
    getAuthHeader()
  );

  return response.data.applications;
};