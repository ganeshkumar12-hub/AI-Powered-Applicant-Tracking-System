import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";

import { getAllJobs } from "../../services/jobService";
import { applyForJob } from "../../services/applicationService";

function RecommendedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await getAllJobs();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (jobId) => {
    try {
      const response = await applyForJob(jobId);

      setSnackbar({
        open: true,
        severity: "success",
        message: response.message,
      });
    } catch (error) {
      setSnackbar({
        open: true,
        severity: "error",
        message:
          error.response?.data?.message || "Failed to apply for job",
      });
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Recommended Jobs
      </Typography>

      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid item xs={12} md={6} key={job._id}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 3,
                height: "100%",
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {job.title}
                </Typography>

                <Typography color="text.secondary">
                  {job.company}
                </Typography>

                <Typography sx={{ mt: 1 }}>
                  📍 {job.location}
                </Typography>

                <Typography>
                  💰 {job.salary}
                </Typography>

                <Typography>
                  💼 {job.jobType}
                </Typography>

                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                  }}
                >
                  {job.skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      color="primary"
                      size="small"
                    />
                  ))}
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 3 }}
                  onClick={() => handleApply(job._id)}
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar({ ...snackbar, open: false })
        }
      >
        <Alert
          severity={snackbar.severity}
          onClose={() =>
            setSnackbar({ ...snackbar, open: false })
          }
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default RecommendedJobs;