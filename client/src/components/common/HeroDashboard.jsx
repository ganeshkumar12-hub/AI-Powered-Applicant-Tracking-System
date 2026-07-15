import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Stack,
  Chip,
} from "@mui/material";

function HeroDashboard() {
  return (
    <Card
      elevation={8}
      sx={{
        borderRadius: 5,
        p: 2,
        maxWidth: 430,
        mx: "auto",
      }}
    >
      <CardContent>

        <Typography
          variant="h6"
          fontWeight={700}
          gutterBottom
        >
          AI Hiring Dashboard
        </Typography>

        <Typography
          color="text.secondary"
          mb={3}
        >
          Resume Match Score
        </Typography>

        <Typography
          variant="h3"
          color="primary"
          fontWeight={700}
        >
          95%
        </Typography>

        <LinearProgress
          variant="determinate"
          value={95}
          sx={{
            mt: 2,
            mb: 4,
            height: 10,
            borderRadius: 5,
          }}
        />

        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          mb={3}
        >
          <Chip label="React" color="primary" />
          <Chip label="Node.js" color="success" />
          <Chip label="MongoDB" color="secondary" />
          <Chip label="Java" color="warning" />
        </Stack>

        <Card
          sx={{
            bgcolor: "#F8FAFC",
            borderRadius: 3,
          }}
        >
          <CardContent>

            <Typography fontWeight={600}>
              Candidate
            </Typography>

            <Typography color="text.secondary">
              Ganesh Kumar
            </Typography>

            <Typography
              color="success.main"
              mt={1}
              fontWeight={600}
            >
              ✔ Highly Recommended
            </Typography>

          </CardContent>
        </Card>

      </CardContent>
    </Card>
  );
}

export default HeroDashboard;