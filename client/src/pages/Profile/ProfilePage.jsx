import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

import Sidebar from "../../components/common/Sidebar";
import {
  getProfile,
  updateProfile,
  uploadResume,
  analyzeResume,
} from "../../services/userService";

function ProfilePage() {
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    about: "",
    education: "",
    experience: "",
    skills: "",
  });

  const [resume, setResume] = useState("");

  const [atsLoading, setAtsLoading] = useState(false);

  const [atsResult, setAtsResult] = useState({
    score: null,
    matchedSkills: [],
    suggestions: [],
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const user = await getProfile();

      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        about: user.about || "",
        education: user.education || "",
        experience: user.experience || "",
        skills: user.skills ? user.skills.join(", ") : "",
      });

      setResume(user.resume || "");
    } catch (error) {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Failed to load profile",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await updateProfile(profile);

      setSnackbar({
        open: true,
        severity: "success",
        message: "Profile updated successfully",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        severity: "error",
        message:
          error.response?.data?.message ||
          "Failed to update profile",
      });
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const response = await uploadResume(file);

      setResume(response.resume);

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
          "Resume upload failed",
      });
    }
  };

  const handleAnalyzeResume = async () => {
    try {
      setAtsLoading(true);

      const result = await analyzeResume();

      setAtsResult({
        score: result.score,
        matchedSkills: result.matchedSkills,
        suggestions: result.suggestions,
      });

      setSnackbar({
        open: true,
        severity: "success",
        message: "Resume analyzed successfully",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        severity: "error",
        message:
          error.response?.data?.message ||
          "Resume analysis failed",
      });
    } finally {
      setAtsLoading(false);
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", background: "#f5f7fb" }}>
      <Sidebar />

      <Box
        sx={{
          ml: "260px",
          width: "calc(100% - 260px)",
          minHeight: "100vh",
          py: 4,
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={3}
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
              My Profile
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={profile.email}
                  disabled
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="About"
                  name="about"
                  value={profile.about}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Skills (comma separated)"
                  name="skills"
                  value={profile.skills}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Education"
                  name="education"
                  value={profile.education}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Experience"
                  name="experience"
                  value={profile.experience}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ mb: 2 }}
                >
                  Resume
                </Typography>

                {resume ? (
                  <Typography sx={{ mb: 2 }}>
                    📄 {resume.split("\\").pop().split("/").pop()}
                  </Typography>
                ) : (
                  <Typography sx={{ mb: 2 }}>
                    No resume uploaded
                  </Typography>
                )}

                <Button
                  variant="outlined"
                  component="label"
                  sx={{ mr: 2 }}
                >
                  Upload Resume

                  <input
                    hidden
                    type="file"
                    accept=".pdf"
                    onChange={handleResumeUpload}
                  />
                </Button>

                {resume && (
                  <>
                    <Button
                      variant="contained"
                      href={`http://localhost:5000/${resume.replace(
                        /\\/g,
                        "/"
                      )}`}
                      target="_blank"
                      sx={{ mr: 2 }}
                    >
                      View Resume
                    </Button>

                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleAnalyzeResume}
                      disabled={atsLoading}
                    >
                      {atsLoading ? "Analyzing..." : "Analyze Resume"}
                    </Button>
                  </>
                )}
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSave}
                >
                  Save Profile
                </Button>
              </Grid>

              {atsResult.score !== null && (
                <Grid item xs={12}>
                  <Paper
                    elevation={2}
                    sx={{
                      mt: 3,
                      p: 3,
                      borderRadius: 3,
                      background: "#f8f9fa",
                    }}
                  >
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      gutterBottom
                    >
                      AI Resume Analysis
                    </Typography>

                    <Typography
                      variant="h3"
                      color="primary"
                      fontWeight="bold"
                    >
                      {atsResult.score}%
                    </Typography>

                    <Typography sx={{ mt: 2 }}>
                      ATS Score
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{ mt: 3 }}
                    >
                      Matched Skills
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                        mt: 1,
                      }}
                    >
                      {atsResult.matchedSkills.map((skill) => (
                        <Chip
                          key={skill}
                          label={skill}
                          color="success"
                        />
                      ))}
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{ mt: 3 }}
                    >
                      Suggestions
                    </Typography>

                    {atsResult.suggestions.length === 0 ? (
                      <Alert
                        severity="success"
                        sx={{ mt: 1 }}
                      >
                        Excellent! Your resume already includes all recommended sections.
                      </Alert>
                    ) : (
                      atsResult.suggestions.map((item, index) => (
                        <Alert
                          key={index}
                          severity="warning"
                          sx={{ mt: 1 }}
                        >
                          {item}
                        </Alert>
                      ))
                    )}
                  </Paper>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Container>

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
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default ProfilePage;