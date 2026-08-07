import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getJobApplicants,
  saveRecruiterNotes,
  scheduleInterview,
  updateApplicationStatus,
} from "../../services/applicationService";

function ApplicantsPage() {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [atsFilter, setAtsFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [selectedStatus, setSelectedStatus] = useState({});
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [openAIReport, setOpenAIReport] = useState(false);
  const [notes, setNotes] = useState("");
  const [openInterviewDialog, setOpenInterviewDialog] = useState(false);
  const [savingInterview, setSavingInterview] = useState(false);

  const [interviewData, setInterviewData] = useState({
    interviewDate: "",
    interviewTime: "",
    interviewMode: "Online",
    meetingLink: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const data = await getJobApplicants(jobId);
      setApplications(data);
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: "Failed to load applicants",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleStatusChange = (id, status) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [id]: status,
    }));
  };

  const handleUpdate = async (id) => {
    try {
      const application = applications.find((app) => app._id === id);
      const status = selectedStatus[id] || application.status;

      await updateApplicationStatus(id, status);

      setSnackbar({
        open: true,
        message: "Application status updated successfully!",
        severity: "success",
      });

      setApplications((prev) =>
        prev.map((app) => (app._id === id ? { ...app, status } : app)),
      );

      setSelectedStatus((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: "Failed to update status",
        severity: "error",
      });
    }
  };

  const handleCloseAIReport = () => {
    setOpenAIReport(false);
    setSelectedApplication(null);
  };

  const handleSaveNotes = async () => {
    try {
      await saveRecruiterNotes(selectedApplication._id, notes);

      setApplications((prev) =>
        prev.map((app) =>
          app._id === selectedApplication._id
            ? { ...app, recruiterNotes: notes }
            : app,
        ),
      );

      setSelectedApplication((prev) => ({
        ...prev,
        recruiterNotes: notes,
      }));

      alert("Recruiter notes saved successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to save recruiter notes.");
    }
  };

  const handleSaveInterview = async () => {
    if (!selectedApplication) return;

    if (!interviewData.interviewDate || !interviewData.interviewTime) {
      setSnackbar({
        open: true,
        message: "Please select an interview date and time",
        severity: "error",
      });
      return;
    }

    try {
      setSavingInterview(true);

      await scheduleInterview(selectedApplication._id, interviewData);

      setSnackbar({
        open: true,
        message: "Interview scheduled successfully!",
        severity: "success",
      });

      // Reflect the "Interview" status locally
      setApplications((prev) =>
        prev.map((app) =>
          app._id === selectedApplication._id
            ? { ...app, status: "Interview" }
            : app,
        ),
      );

      setOpenInterviewDialog(false);
      setInterviewData({
        interviewDate: "",
        interviewTime: "",
        interviewMode: "Online",
        meetingLink: "",
      });
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: "Failed to schedule interview",
        severity: "error",
      });
    } finally {
      setSavingInterview(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Paper sx={{ p: 4, m: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Job Applicants
        </Typography>

        <Typography mb={3}>Total Applicants: {applications.length}</Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            label="Search Applicant"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <FormControl sx={{ minWidth: 220 }}>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="All">All Status</MenuItem>
              <MenuItem value="Applied">Applied</MenuItem>
              <MenuItem value="Shortlisted">Shortlisted</MenuItem>
              <MenuItem value="Interview">Interview</MenuItem>
              <MenuItem value="Selected">Selected</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <FormControl sx={{ minWidth: 160 }}>
          <Select
            value={atsFilter}
            onChange={(e) => setAtsFilter(e.target.value)}
          >
            <MenuItem value="All">All ATS</MenuItem>
            <MenuItem value="50">50%+</MenuItem>
            <MenuItem value="60">60%+</MenuItem>
            <MenuItem value="70">70%+</MenuItem>
            <MenuItem value="80">80%+</MenuItem>
            <MenuItem value="90">90%+</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 180 }}>
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <MenuItem value="Newest">Newest</MenuItem>
            <MenuItem value="Oldest">Oldest</MenuItem>
            <MenuItem value="Highest ATS">Highest ATS</MenuItem>
            <MenuItem value="Lowest ATS">Lowest ATS</MenuItem>
          </Select>
        </FormControl>

        {applications.length === 0 ? (
          <Typography>No applicants yet.</Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Email</strong>
                  </TableCell>
                  <TableCell>
                    <strong>ATS Score</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Job</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Company</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Status</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Resume</strong>
                  </TableCell>
                  <TableCell>
                    <strong>AI Report</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Update</strong>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {applications
                  .filter((application) => {
                    const matchesSearch = application.applicant?.name
                      ?.toLowerCase()
                      .includes(searchTerm.toLowerCase());

                    const matchesStatus =
                      statusFilter === "All" ||
                      application.status === statusFilter;

                    const matchesATS =
                      atsFilter === "All" ||
                      (application.applicant?.atsScore || 0) >=
                        Number(atsFilter);

                    return matchesSearch && matchesStatus && matchesATS;
                  })
                  .sort((a, b) => {
                    switch (sortBy) {
                      case "Highest ATS":
                        return (
                          (b.applicant?.atsScore || 0) -
                          (a.applicant?.atsScore || 0)
                        );
                      case "Lowest ATS":
                        return (
                          (a.applicant?.atsScore || 0) -
                          (b.applicant?.atsScore || 0)
                        );
                      case "Oldest":
                        return new Date(a.createdAt) - new Date(b.createdAt);
                      case "Newest":
                      default:
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    }
                  })
                  .map((application) => (
                    <TableRow key={application._id}>
                      <TableCell>{application.applicant?.name}</TableCell>
                      <TableCell>{application.applicant?.email}</TableCell>

                      <TableCell>
                        <Stack spacing={1}>
                          <Chip
                            label={`${application.applicant?.atsScore || 0}%`}
                            color={
                              (application.applicant?.atsScore || 0) >= 75
                                ? "success"
                                : (application.applicant?.atsScore || 0) >= 50
                                  ? "warning"
                                  : "error"
                            }
                          />

                          <Tooltip
                            title={
                              application.applicant?.matchedSkills?.length
                                ? application.applicant.matchedSkills.join(", ")
                                : "No matched skills"
                            }
                            arrow
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                                cursor: "pointer",
                              }}
                            >
                              {application.applicant?.matchedSkills
                                ?.slice(0, 4)
                                .map((skill) => (
                                  <Chip
                                    key={skill}
                                    label={skill}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                  />
                                ))}
                              {application.applicant?.matchedSkills?.length >
                                4 && (
                                <Chip
                                  label={`+${application.applicant.matchedSkills.length - 4}`}
                                  size="small"
                                  color="secondary"
                                  variant="filled"
                                />
                              )}
                            </Box>
                          </Tooltip>
                        </Stack>
                      </TableCell>

                      <TableCell>{application.job?.title}</TableCell>
                      <TableCell>{application.job?.company}</TableCell>

                      <TableCell sx={{ width: 220 }}>
                        <FormControl fullWidth size="small">
                          <Select
                            value={
                              selectedStatus[application._id] ??
                              application.status
                            }
                            onChange={(e) =>
                              handleStatusChange(
                                application._id,
                                e.target.value,
                              )
                            }
                          >
                            <MenuItem value="Applied">Applied</MenuItem>
                            <MenuItem value="Interview">Interview</MenuItem>
                            <MenuItem value="Shortlisted">Shortlisted</MenuItem>
                            <MenuItem value="Rejected">Rejected</MenuItem>
                            <MenuItem value="Selected">Selected</MenuItem>
                          </Select>
                        </FormControl>
                        {application.interviewDate && (
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="caption" display="block">
                              📅{" "}
                              {new Date(
                                application.interviewDate,
                              ).toLocaleDateString()}
                            </Typography>

                            <Typography variant="caption" display="block">
                              🕒 {application.interviewTime}
                            </Typography>

                            <Typography variant="caption" display="block">
                              💻 {application.interviewMode}
                            </Typography>
                          </Box>
                        )}
                      </TableCell>

                      <TableCell>
                        {application.applicant?.resume ? (
                          <Stack direction="row" spacing={1}>
                            <Button
                              variant="outlined"
                              size="small"
                              component="a"
                              href={`http://localhost:5000/${application.applicant.resume.replace(/\\/g, "/")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View
                            </Button>

                            <Button
                              variant="contained"
                              size="small"
                              component="a"
                              href={`http://localhost:5000/${application.applicant.resume.replace(/\\/g, "/")}`}
                              download
                            >
                              Download
                            </Button>
                          </Stack>
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            Not Uploaded
                          </Typography>
                        )}
                      </TableCell>

                      <TableCell>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => {
                            setSelectedApplication(application);
                            setNotes(application.recruiterNotes || "");
                            setOpenAIReport(true);
                          }}
                        >
                          View AI
                        </Button>
                      </TableCell>

                      <TableCell>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleUpdate(application._id)}
                        >
                          Update
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <Dialog
        open={openInterviewDialog}
        onClose={() => setOpenInterviewDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Schedule Interview</DialogTitle>

        <DialogContent>
          <Typography sx={{ mt: 2, mb: 1 }} variant="subtitle2">
            Interview Date
          </Typography>
          <TextField
            fullWidth
            type="date"
            value={interviewData.interviewDate}
            onChange={(e) =>
              setInterviewData({
                ...interviewData,
                interviewDate: e.target.value,
              })
            }
          />

          <Typography sx={{ mt: 2, mb: 1 }} variant="subtitle2">
            Interview Time
          </Typography>
          <TextField
            fullWidth
            type="time"
            value={interviewData.interviewTime}
            onChange={(e) =>
              setInterviewData({
                ...interviewData,
                interviewTime: e.target.value,
              })
            }
          />

          <TextField
            select
            fullWidth
            margin="normal"
            label="Interview Mode"
            value={interviewData.interviewMode}
            onChange={(e) =>
              setInterviewData({
                ...interviewData,
                interviewMode: e.target.value,
              })
            }
          >
            <MenuItem value="Online">Online</MenuItem>
            <MenuItem value="Offline">Offline</MenuItem>
          </TextField>

          <TextField
            fullWidth
            margin="normal"
            label="Meeting Link"
            placeholder="https://meet.google.com/..."
            value={interviewData.meetingLink}
            onChange={(e) =>
              setInterviewData({
                ...interviewData,
                meetingLink: e.target.value,
              })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setOpenInterviewDialog(false)}
            disabled={savingInterview}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSaveInterview}
            disabled={savingInterview}
          >
            {savingInterview ? "Saving..." : "Save Interview"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* AI Report Dialog */}
      <Dialog
        open={openAIReport}
        onClose={handleCloseAIReport}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          AI Report — {selectedApplication?.applicant?.name}
        </DialogTitle>

        <DialogContent dividers>
          {selectedApplication ? (
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  ATS Score
                </Typography>
                <Chip
                  label={`${selectedApplication.applicant?.atsScore || 0}%`}
                  color={
                    (selectedApplication.applicant?.atsScore || 0) >= 75
                      ? "success"
                      : (selectedApplication.applicant?.atsScore || 0) >= 50
                        ? "warning"
                        : "error"
                  }
                  sx={{ mt: 0.5 }}
                />
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Matched Skills
                </Typography>
                <Box
                  sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.5 }}
                >
                  {selectedApplication.applicant?.matchedSkills?.length ? (
                    selectedApplication.applicant.matchedSkills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No matched skills
                    </Typography>
                  )}
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Recommendation
                </Typography>
                <Chip
                  label={selectedApplication.recommendation}
                  color={
                    selectedApplication.recommendation === "Strong Candidate"
                      ? "success"
                      : selectedApplication.recommendation ===
                          "Moderate Candidate"
                        ? "warning"
                        : "error"
                  }
                  sx={{ mt: 1 }}
                />
              </Box>

              {selectedApplication.aiSummary && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    AI Summary
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {selectedApplication.aiSummary}
                  </Typography>
                </Box>
              )}

              {selectedApplication.strengths?.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Strengths
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {selectedApplication.strengths.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        color="success"
                        size="small"
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {selectedApplication.weaknesses?.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Missing Skills
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {selectedApplication.weaknesses.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        color="error"
                        size="small"
                      />
                    ))}
                  </Box>
                </Box>
              )}

              <Box sx={{ mt: 3 }}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  Recruiter Notes
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Write private recruiter notes..."
                />
              </Box>
            </Stack>
          ) : (
            <Typography>No data available.</Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => {
              setOpenAIReport(false);
              setOpenInterviewDialog(true);
            }}
          >
            Schedule Interview
          </Button>

          <Button variant="contained" onClick={handleSaveNotes}>
            Save Notes
          </Button>

          <Button onClick={() => setOpenAIReport(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ApplicantsPage;
