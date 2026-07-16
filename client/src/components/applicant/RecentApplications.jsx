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
} from "@mui/material";

const applications = [
  {
    company: "Google",
    role: "Frontend Developer",
    status: "Under Review",
  },
  {
    company: "Infosys",
    role: "Java Developer",
    status: "Shortlisted",
  },
  {
    company: "Amazon",
    role: "React Developer",
    status: "Pending",
  },
  {
    company: "Microsoft",
    role: "Software Engineer",
    status: "Rejected",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Shortlisted":
      return "success";
    case "Pending":
      return "warning";
    case "Rejected":
      return "error";
    default:
      return "info";
  }
};

function RecentApplications() {
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
        📄 Recent Applications
      </Typography>

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
            </TableRow>
          </TableHead>

          <TableBody>
            {applications.map((job, index) => (
              <TableRow key={index}>
                <TableCell>{job.company}</TableCell>

                <TableCell>{job.role}</TableCell>

                <TableCell>
                  <Chip
                    label={job.status}
                    color={getStatusColor(job.status)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default RecentApplications;