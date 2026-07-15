import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import JobsPage from "../pages/Jobs/JobsPage";
import JobDetailsPage from "../pages/Jobs/JobDetailsPage";
import ApplicantDashboard from "../pages/Applicant/ApplicantDashboard";
import RecruiterDashboard from "../pages/Recruiter/RecruiterDashboard";
import ProfilePage from "../pages/Profile/ProfilePage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobDetailsPage />} />
        <Route path="/applicant" element={<ApplicantDashboard />} />
        <Route path="/recruiter" element={<RecruiterDashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;