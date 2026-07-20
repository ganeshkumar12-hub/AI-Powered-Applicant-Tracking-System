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

// ===============================
// Applicant - Apply for Job
// ===============================
export const applyForJob = async (jobId) => {
  const response = await axios.post(
    API_URL,
    { jobId },
    getAuthHeader()
  );

  return response.data;
};

// ===============================
// Applicant - My Applications
// ===============================
export const getMyApplications = async () => {
  const response = await axios.get(
    `${API_URL}/my-applications`,
    getAuthHeader()
  );

  return response.data.applications;
};

// ===============================
// Recruiter - Get Applicants
// ===============================
export const getJobApplicants = async (jobId) => {
  const response = await axios.get(
    `${API_URL}/job/${jobId}`,
    getAuthHeader()
  );

  return response.data.applications;
};

// ===============================
// Recruiter - Update Status
// ===============================
export const updateApplicationStatus = async (
  applicationId,
  status
) => {
  const response = await axios.put(
    `${API_URL}/${applicationId}/status`,
    { status },
    getAuthHeader()
  );

  return response.data;
};