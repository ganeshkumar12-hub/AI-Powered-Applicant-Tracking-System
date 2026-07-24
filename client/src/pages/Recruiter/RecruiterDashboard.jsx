import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/common/Sidebar";
import MyJobs from "./MyJobs";
import { getDashboardStats } from "../../services/jobService";

function RecruiterDashboard() {
  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    jobsPosted: 0,
    applications: 0,
    activeJobs: 0,
    shortlisted: 0,
    selected: 0,
    rejected: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const dashboardCards = [
    {
      title: "Jobs Posted",
      value: stats.jobsPosted,
      color: "#2563EB",
    },
    {
      title: "Applications",
      value: stats.applications,
      color: "#10B981",
    },
    {
      title: "Active Jobs",
      value: stats.activeJobs,
      color: "#F59E0B",
    },
    {
      title: "Shortlisted",
      value: stats.shortlisted,
      color: "#7C3AED",
    },
    {
      title: "Selected",
      value: stats.selected,
      color: "#16A34A",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      color: "#DC2626",
    },
  ];

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 10,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        background: "#f5f7fb",
      }}
    >
      <Sidebar />

      <Box
        sx={{
          ml: "260px",
          width: "calc(100% - 260px)",
          minHeight: "100vh",
          py: 5,
        }}
      >
        <Container maxWidth="xl">
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

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mb: 3,
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() =>
                navigate("/recruiter/create-job")
              }
            >
              + Create Job
            </Button>
          </Box>

          <Grid container spacing={4}>
            {dashboardCards.map((card) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={card.title}
              >
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
                    {card.title}
                  </Typography>

                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    sx={{
                      mt: 2,
                      color: card.color,
                    }}
                  >
                    {card.value}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 5 }}>
            <MyJobs />
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default RecruiterDashboard;