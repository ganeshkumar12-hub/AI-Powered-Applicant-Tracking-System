import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Button,
  CircularProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";

import {
  getRecruiterJobs,
  deleteJob,
} from "../../services/jobService";

function MyJobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchJobs = async () => {
    try {
      const data = await getRecruiterJobs();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedJobId(id);
    setDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setDeleting(true);

      await deleteJob(selectedJobId);

      setJobs((prev) =>
        prev.filter((job) => job._id !== selectedJobId)
      );

      setSnackbar({
        open: true,
        message: "Job deleted successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error(error);

      setSnackbar({
        open: true,
        message: "Failed to delete job",
        severity: "error",
      });
    } finally {
      setDeleting(false);
      setDeleteDialog(false);
      setSelectedJobId(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog(false);
    setSelectedJobId(null);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 4,
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={3}
      >
        My Jobs
      </Typography>

      {jobs.length === 0 ? (
        <Typography color="text.secondary">
          You haven't posted any jobs yet.
        </Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Title</strong>
                </TableCell>

                <TableCell>
                  <strong>Company</strong>
                </TableCell>

                <TableCell>
                  <strong>Location</strong>
                </TableCell>

                <TableCell>
                  <strong>Salary</strong>
                </TableCell>

                <TableCell align="center">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job._id}>
                  <TableCell>{job.title}</TableCell>

                  <TableCell>{job.company}</TableCell>

                  <TableCell>{job.location}</TableCell>

                  <TableCell>{job.salary}</TableCell>

                  <TableCell align="center">
                    {/* Applicants */}
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() =>
                        navigate(
                          `/recruiter/job/${job._id}/applicants`
                        )
                      }
                    >
                      Applicants
                    </Button>

                    {/* Edit */}
                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() =>
                        navigate(
                          `/recruiter/edit-job/${job._id}`
                        )
                      }
                    >
                      Edit
                    </Button>

                    {/* Delete */}
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteClick(job._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>
          Delete Job
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this job?
            <br />
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleDeleteCancel}
            color="inherit"
          >
            Cancel
          </Button>

          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success/error feedback */}
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
    </Paper>
  );
}

export default MyJobs;