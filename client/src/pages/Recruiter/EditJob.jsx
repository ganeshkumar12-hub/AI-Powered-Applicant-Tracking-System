import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Paper,
  Snackbar,
  Alert,
  TextField,
  Typography,
} from "@mui/material";

import {
  getJobById,
  updateJob,
} from "../../services/jobService";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "Full-Time",
    experience: "",
    salary: "",
    skills: "",
    description: "",
  });

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const job = await getJobById(id);

      setFormData({
        title: job.title || "",
        company: job.company || "",
        location: job.location || "",
        jobType: job.jobType || "Full-Time",
        experience: job.experience || "",
        salary: job.salary || "",
        skills: job.skills
          ? job.skills.join(", ")
          : "",
        description: job.description || "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateJob(id, {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      });

      setSnackbar({
        open: true,
        message: "Job updated successfully!",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/recruiter");
      }, 1500);

    } catch (error) {
      console.error(error);

      setSnackbar({
        open: true,
        message: "Failed to update job",
        severity: "error",
      });
    }
  };

  if (loading) {
    return (
      <Typography sx={{ mt: 5, textAlign: "center" }}>
        Loading...
      </Typography>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={4}
        >
          Edit Job
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <Grid container spacing={3}>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Job Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Job Type"
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
              >
                <MenuItem value="Full-Time">
                  Full-Time
                </MenuItem>

                <MenuItem value="Part-Time">
                  Part-Time
                </MenuItem>

                <MenuItem value="Internship">
                  Internship
                </MenuItem>

                <MenuItem value="Remote">
                  Remote
                </MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Skills (comma separated)"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={6}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
              >
                Update Job
              </Button>

              <Button
                sx={{ ml: 2 }}
                variant="outlined"
                onClick={() =>
                  navigate("/recruiter")
                }
              >
                Cancel
              </Button>
            </Grid>

          </Grid>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() =>
          setSnackbar((prev) => ({
            ...prev,
            open: false,
          }))
        }
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default EditJob;