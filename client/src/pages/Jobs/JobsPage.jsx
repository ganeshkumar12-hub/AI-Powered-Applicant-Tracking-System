import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

import { getAllJobs } from "../../services/jobService";
import { applyForJob } from "../../services/applicationService";

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const data = await getAllJobs(filters);

      setJobs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
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
          error.response?.data?.message ||
          "Failed to apply for job",
      });
    }
  };

  return (
    <Box p={4}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Available Jobs
      </Typography>

      {/* Search & Filters */}

      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Search Title"
            name="title"
            value={filters.title}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Company"
            name="company"
            value={filters.company}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={filters.location}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            select
            fullWidth
            label="Job Type"
            name="jobType"
            value={filters.jobType}
            onChange={handleChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Full-Time">Full-Time</MenuItem>
            <MenuItem value="Part-Time">Part-Time</MenuItem>
            <MenuItem value="Internship">Internship</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      {/* Loading */}

      {loading ? (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      ) : jobs.length === 0 ? (
        <Typography>No Jobs Found</Typography>
      ) : (
        <Grid container spacing={3}>
          {jobs.map((job) => (
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              key={job._id}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 3,
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  {job.title}
                </Typography>

                <Typography mt={1}>
                  {job.company}
                </Typography>

                <Typography>
                  {job.location}
                </Typography>

                <Typography>
                  {job.jobType}
                </Typography>

                <Typography mt={2}>
                  {job.salary}
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => handleApply(job._id)}
                >
                  Apply
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar({
            ...snackbar,
            open: false,
          })
        }
      >
        <Alert
          severity={snackbar.severity}
          onClose={() =>
            setSnackbar({
              ...snackbar,
              open: false,
            })
          }
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default JobsPage;