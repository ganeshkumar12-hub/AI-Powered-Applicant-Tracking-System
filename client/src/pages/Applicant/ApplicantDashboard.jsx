import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Sidebar from "../../components/common/Sidebar";
import ProfileCard from "../../components/applicant/ProfileCard";
import RecentApplications from "../../components/applicant/RecentApplications";
import RecommendedJobs from "../../components/applicant/RecommendedJobs";

function ApplicantDashboard() {
  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const stats = [
    {
      title: "Applied Jobs",
      value: 12,
      color: "#2563EB",
    },
    {
      title: "Resume Score",
      value: "92%",
      color: "#10B981",
    },
    {
      title: "Shortlisted",
      value: 5,
      color: "#F59E0B",
    },
    {
      title: "Interviews",
      value: 2,
      color: "#7C3AED",
    },
  ];

  return (
  <Box sx={{ display: "flex", background: "#f5f7fb" }}>
    {/* Sidebar */}
    <Sidebar />

    {/* Main Content */}
    <Box
      sx={{
        ml: "260px",
        width: "calc(100% - 260px)",
        minHeight: "100vh",
        py: 5,
      }}
    >
      <Container maxWidth="xl">
        {/* Welcome Banner */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 4,
            mb: 4,
            background: "linear-gradient(135deg,#2563EB,#7C3AED)",
            color: "white",
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            Welcome, {user.name || "Applicant"} 👋
          </Typography>

          <Typography variant="h6" sx={{ mt: 1, opacity: 0.9 }}>
            Find your dream job with AI-powered recommendations.
          </Typography>
        </Paper>

        {/* Statistics */}
        <Grid container spacing={3}>
          {stats.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.title}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  {item.title}
                </Typography>

                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{
                    color: item.color,
                    mt: 2,
                  }}
                >
                  {item.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Dashboard Content */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={8}>
            <RecommendedJobs />
            <RecentApplications />
          </Grid>

          <Grid item xs={12} md={4}>
            <ProfileCard />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </Box>
);
}
export default ApplicantDashboard;