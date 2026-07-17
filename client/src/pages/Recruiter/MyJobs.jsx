import { useEffect, useState } from "react";
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
} from "@mui/material";

import { getRecruiterJobs } from "../../services/jobService";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
const fetchJobs = async () => {
  try {
    const data = await getRecruiterJobs();

    console.log("Recruiter Jobs:", data);

    setJobs(data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchJobs();
  }, []);

  
  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
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
        borderRadius: 3,
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb={3}>
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
                <TableCell><strong>Title</strong></TableCell>
                <TableCell><strong>Company</strong></TableCell>
                <TableCell><strong>Location</strong></TableCell>
                <TableCell><strong>Salary</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job._id}>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.salary}</TableCell>

                  <TableCell>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{ mr: 1 }}
                    >
                      Applicants
                    </Button>

                    <Button
                      size="small"
                      color="warning"
                      variant="contained"
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>

                    <Button
                      size="small"
                      color="error"
                      variant="contained"
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
    </Paper>
  );
}

export default MyJobs;