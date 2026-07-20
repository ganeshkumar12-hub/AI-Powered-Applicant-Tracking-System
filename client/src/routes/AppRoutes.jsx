import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";

import JobsPage from "../pages/Jobs/JobsPage";
import JobDetailsPage from "../pages/Jobs/JobDetailsPage";

import ApplicantDashboard from "../pages/Applicant/ApplicantDashboard";

import RecruiterDashboard from "../pages/Recruiter/RecruiterDashboard";
import ApplicantsPage from "../pages/Recruiter/ApplicantsPage";
import EditJob from "../pages/Recruiter/EditJob";

import ProfilePage from "../pages/Profile/ProfilePage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* Authentication */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Jobs */}
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobDetailsPage />} />

        {/* Applicant */}
        <Route
          path="/applicant"
          element={<ApplicantDashboard />}
        />

        {/* Recruiter */}
        <Route
          path="/recruiter"
          element={<RecruiterDashboard />}
        />

      
        {/* Edit Job */}
        <Route
          path="/recruiter/edit-job/:id"
          element={<EditJob />}
        />

        {/* Applicants */}
        <Route
          path="/recruiter/job/:jobId/applicants"
          element={<ApplicantsPage />}
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={<ProfilePage />}
        />

        {/* 404 */}
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;