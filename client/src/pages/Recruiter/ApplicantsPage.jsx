import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Paper,
  Typography,
  CircularProgress,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  FormControl,
  Select,
  MenuItem,
  Button,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";

import {
  getJobApplicants,
  updateApplicationStatus,
} from "../../services/applicationService";

function ApplicantsPage() {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Stores selected dropdown values
  const [selectedStatus, setSelectedStatus] = useState({});

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
                    <strong>Update</strong>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application._id}>
                    <TableCell>
                      {application.applicant?.name}
                    </TableCell>

                    <TableCell>
                      {application.applicant?.email}
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
        <Alert
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ApplicantsPage;