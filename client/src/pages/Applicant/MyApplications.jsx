import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import Sidebar from "../../components/common/Sidebar";
import { getMyApplications } from "../../services/applicationService";

function MyApplications() {
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

  const getChipColor = (status) => {
    switch (status) {
      case "Applied":
        return "primary";
      case "Interview":
        return "warning";
      case "Shortlisted":
        return "secondary";
      case "Rejected":
        return "error";
      case "Selected":
        return "success";
      default:
        return "default";
    }
  };

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
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight="bold" mb={4}>
            My Applications
          </Typography>

          {loading ? (
            <Box textAlign="center">
              <CircularProgress />
            </Box>
          ) : applications.length === 0 ? (
            <Typography>No applications found.</Typography>
          ) : (
            <Grid container spacing={3}>
              {applications.map((application) => (
                <Grid item xs={12} md={6} key={application._id}>
                  <Card elevation={3}>
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">
                        {application.job?.title}
                      </Typography>

                      <Typography>
                        📍 {application.job?.location || "Not Specified"}
                      </Typography>

                      <Typography>
                        💼{" "}
                        {application.job?.employmentType ||
                          application.job?.jobType ||
                          "Not Specified"}
                      </Typography>

                      <Typography>
                        💰 {application.job?.salary || "Not Specified"}
                      </Typography>

                      <Box sx={{ mt: 2 }}>
                        <Chip
                          label={application.status}
                          color={getChipColor(application.status)}
                        />
                      </Box>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 2 }}
                      >
                        Applied on{" "}
                        {new Date(application.createdAt).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </Box>
  );
}

export default MyApplications;
