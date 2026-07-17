import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Box,
} from "@mui/material";

import { getMyApplications } from "../../services/applicationService";

const getStatusColor = (status) => {
  switch (status) {
    case "Shortlisted":
      return "success";
    case "Applied":
      return "primary";
    case "Under Review":
      return "info";
    case "Interview":
      return "warning";
    case "Hired":
      return "success";
    case "Rejected":
      return "error";
    default:
      return "default";
  }
};

function RecentApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const data = await getMyApplications();
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

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
        borderRadius: 4,
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb={3}>
        📄 Recent Applications
      </Typography>

      {applications.length === 0 ? (
        <Typography align="center" color="text.secondary">
          No applications found.
        </Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Company</strong>
                </TableCell>

                <TableCell>
                  <strong>Role</strong>
                </TableCell>

                <TableCell>
                  <strong>Status</strong>
                </TableCell>

                <TableCell>
                  <strong>Applied On</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {applications.map((application) => (
                <TableRow key={application._id}>
                  <TableCell>
                    {application.job?.company}
                  </TableCell>

                  <TableCell>
                    {application.job?.title}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={application.status}
                      color={getStatusColor(application.status)}
                    />
                  </TableCell>

                  <TableCell>
                    {new Date(
                      application.createdAt
                    ).toLocaleDateString()}
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

export default RecentApplications;