import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

import { createJob } from "../../services/jobService";

function CreateJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "",
    experience: "",
    salary: "",
    skills: "",
    description: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createJob(formData);

      setSnackbar({
        open: true,
        message: "Job created successfully!",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/recruiter");
      }, 1500);
    } catch (error) {
      console.error(error);

      setSnackbar({
        open: true,
        message: "Failed to create job",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={3}
        >
          Create Job
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            select
            fullWidth
            label="Job Type"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            margin="normal"
            required
          >
            <MenuItem value="Full-Time">Full-Time</MenuItem>
            <MenuItem value="Part-Time">Part-Time</MenuItem>
            <MenuItem value="Internship">Internship</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Skills (comma separated)"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            multiline
            rows={5}
            label="Job Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Job"}
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar((prev) => ({
            ...prev,
            open: false,
          }))
        }
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
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

export default CreateJob;