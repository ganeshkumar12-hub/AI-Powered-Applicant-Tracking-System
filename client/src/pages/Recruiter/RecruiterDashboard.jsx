import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import Sidebar from "../../components/common/Sidebar";
import MyJobs from "./MyJobs";

function RecruiterDashboard() {
  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const stats = [
    {
      title: "Jobs Posted",
      value: "--",
      color: "#2563EB",
    },
    {
      title: "Applications",
      value: "--",
      color: "#10B981",
    },
    {
      title: "Active Jobs",
      value: "--",
      color: "#F59E0B",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        background: "#f5f7fb",
      }}
    >
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
              background:
                "linear-gradient(135deg,#2563EB,#7C3AED)",
              color: "white",
            }}
          >
            <Typography variant="h3" fontWeight="bold">
              Welcome, {user.name || "Recruiter"} 👋
            </Typography>

            <Typography
              variant="h6"
              sx={{
                mt: 1,
                opacity: 0.9,
              }}
            >
              Manage your job postings and applicants.
            </Typography>
          </Paper>

          {/* Statistics */}
          <Grid container spacing={4} sx={{ mb: 4 }}>
            {stats.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.title}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    color="text.secondary"
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    sx={{
                      mt: 2,
                      color: item.color,
                    }}
                  >
                    {item.value}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* My Jobs */}
          <Box sx={{ mt: 4 }}>
            <MyJobs />
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default RecruiterDashboard;