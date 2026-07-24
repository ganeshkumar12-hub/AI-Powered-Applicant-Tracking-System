import axios from "axios";

const API_URL = "http://localhost:5000/api/jobs";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ===============================
// Get All Jobs (Applicant)
// ===============================
export const getAllJobs = async () => {
  const response = await axios.get(API_URL);
  return response.data.jobs;
};

// ===============================
// Get Single Job
// ===============================
export const getJobById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data.job;
};

// ===============================
// Recruiter - Get My Jobs
// ===============================
export const getRecruiterJobs = async () => {
  const response = await axios.get(
    `${API_URL}/my-jobs`,
    getAuthHeader()
  );

  return response.data.jobs;
};
// ===============================
// Recruiter - Dashboard Statistics
// ===============================
export const getDashboardStats = async () => {
  const response = await axios.get(
    `${API_URL}/dashboard`,
    getAuthHeader()
  );

  return response.data.stats;
};
// ===============================
// Recruiter - Create Job
// ===============================
export const createJob = async (jobData) => {
  const response = await axios.post(
    API_URL,
    jobData,
    getAuthHeader()
  );

  return response.data;
};

// ===============================
// Recruiter - Update Job
// ===============================
export const updateJob = async (id, jobData) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    jobData,
    getAuthHeader()
  );

  return response.data;
};

// ===============================
// Recruiter - Delete Job
// ===============================
export const deleteJob = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    getAuthHeader()
  );

  return response.data;
};