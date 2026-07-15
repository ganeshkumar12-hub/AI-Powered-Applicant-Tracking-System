import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import HeroDashboard from "./HeroDashboard";

function Hero() {
  return (
    <Box
      sx={{
        py: 12,
        background: "linear-gradient(135deg, #EFF6FF 0%, #F8FAFC 100%)",
      }}
    >
      <Container maxWidth="lg">

        <Grid
          container
          spacing={6}
          alignItems="center"
        >

          <Grid size={{ xs: 12, md: 6 }}>

            <Typography
              variant="h2"
              fontWeight={700}
            >
              Hire Smarter with
              <br />
              AI-Powered Recruitment
            </Typography>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                mt: 3,
                mb: 5,
              }}
            >
              Streamline hiring, analyze resumes with AI,
              rank candidates, and find the perfect talent
              faster than ever.
            </Typography>

            <Button
              variant="contained"
              size="large"
              sx={{ mr: 2 }}
            >
              Get Started
            </Button>

            <Button
              variant="outlined"
              size="large"
            >
              Explore Jobs
            </Button>

          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <HeroDashboard />
          </Grid>

        </Grid>

      </Container>
    </Box>
  );
}

export default Hero;