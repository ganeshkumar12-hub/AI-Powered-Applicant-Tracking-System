import { Grid, Typography, Box } from "@mui/material";

import Sidebar from "../../components/common/Sidebar";
import MyJobs from "./MyJobs";

function RecruiterDashboard() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          backgroundColor: "#f5f7fb",
          minHeight: "100vh",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          Recruiter Dashboard
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Manage your jobs and applicants.
        </Typography>

        {/* Statistics */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                bgcolor: "white",
                p: 3,
                borderRadius: 3,
                boxShadow: 2,
              }}
            >
              <Typography variant="h6">Jobs Posted</Typography>
              <Typography variant="h4" fontWeight="bold">
                --
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              sx={{
                bgcolor: "white",
                p: 3,
                borderRadius: 3,
                boxShadow: 2,
              }}
            >
              <Typography variant="h6">Applications</Typography>
              <Typography variant="h4" fontWeight="bold">
                --
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              sx={{
                bgcolor: "white",
                p: 3,
                borderRadius: 3,
                boxShadow: 2,
              }}
            >
              <Typography variant="h6">Active Jobs</Typography>
              <Typography variant="h4" fontWeight="bold">
                --
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* My Jobs */}
        <MyJobs />
      </Box>
    </Box>
  );
}

export default RecruiterDashboard;