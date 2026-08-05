import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
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
  Dialog,
DialogTitle,
DialogContent,
DialogActions,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getJobApplicants,
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
  // Stores selected dropdown values
  const [selectedStatus, setSelectedStatus] = useState({});
  const [selectedApplication, setSelectedApplication] = useState(null);
const [openAIReport, setOpenAIReport] = useState(false);

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

      // Update UI instantly
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status } : app
        )
      );

      // Remove temporary selection
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

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Paper
        sx={{
          p: 4,
          m: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Job Applicants
        </Typography>

        <Typography mb={3}>
          Total Applicants: {applications.length}
        </Typography>
        <Box
  sx={{
    display: "flex",
    gap: 2,
    mb: 3,
  }}
>
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
      onChange={(e) =>
        setStatusFilter(e.target.value)
      }
    >
      <MenuItem value="All">All Status</MenuItem>
      <MenuItem value="Applied">Applied</MenuItem>
      <MenuItem value="Shortlisted">
        Shortlisted
      </MenuItem>
      <MenuItem value="Interview">
        Interview
      </MenuItem>
      <MenuItem value="Selected">
        Selected
      </MenuItem>
      <MenuItem value="Rejected">
        Rejected
      </MenuItem>
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
  <Select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
  >
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
  <Button
    variant="outlined"
    color="secondary"
    onClick={() => {
      setSelectedApplication(application);
      setOpenAIReport(true);
    }}
  >
    View AI
  </Button>
</TableCell>
                  <TableCell>
                    <strong>Update</strong>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {applications
  .filter((application) => {
    const matchesSearch =
      application.applicant?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      application.status === statusFilter;

    const matchesATS =
      atsFilter === "All" ||
      (application.applicant?.atsScore || 0) >= Number(atsFilter);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesATS
    );
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
        return (
          new Date(a.createdAt) -
          new Date(b.createdAt)
        );

      case "Newest":
      default:
        return (
          new Date(b.createdAt) -
          new Date(a.createdAt)
        );
    }
  })
  .map((application) => (
                  <TableRow key={application._id}>
                    <TableCell>
                      {application.applicant?.name}
                    </TableCell>

                    <TableCell>
                      {application.applicant?.email}
                    </TableCell>

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
                                label={`+${
                                  application.applicant.matchedSkills.length - 4
                                }`}
                                size="small"
                                color="secondary"
                                variant="filled"
                              />
                            )}
                          </Box>
                        </Tooltip>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      {application.job?.title}
                    </TableCell>

                    <TableCell>
                      {application.job?.company}
                    </TableCell>

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
                              e.target.value
                            )
                          }
                        >
                          <MenuItem value="Applied">
                            Applied
                          </MenuItem>

                          <MenuItem value="Interview">
                            Interview
                          </MenuItem>

                          <MenuItem value="Shortlisted">
                            Shortlisted
                          </MenuItem>

                          <MenuItem value="Rejected">
                            Rejected
                          </MenuItem>

                          <MenuItem value="Selected">
                            Selected
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>

                    <TableCell>
                      {application.applicant?.resume ? (
                        <Stack direction="row" spacing={1}>
                          <Button
                            variant="outlined"
                            size="small"
                            component="a"
                            href={`http://localhost:5000/${application.applicant.resume.replace(
                              /\\/g,
                              "/"
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </Button>

                          <Button
                            variant="contained"
                            size="small"
                            component="a"
                            href={`http://localhost:5000/${application.applicant.resume.replace(
                              /\\/g,
                              "/"
                            )}`}
                            download
                          >
                            Download
                          </Button>
                        </Stack>
                      ) : (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          Not Uploaded
                        </Typography>
                      )}
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() =>
                          handleUpdate(application._id)
                        }
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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
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
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ApplicantsPage;