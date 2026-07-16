import { Box, Container, Stack, Typography } from "@mui/material";

import RegisterForm from "../../components/auth/RegisterForm";

function RegisterPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#2563EB,#7C3AED)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          justifyContent="center"
        >
          {/* Left Side */}
          <Box flex={1}>
            <Typography
              variant="h2"
              fontWeight={700}
              color="white"
              gutterBottom
            >
              Join AI Powered ATS
            </Typography>

            <Typography
              variant="h6"
              color="white"
              sx={{ opacity: 0.9 }}
            >
              Create your account to explore jobs, apply instantly,
              or recruit top talent using AI-powered resume analysis.
            </Typography>
          </Box>

          {/* Right Side */}
          <RegisterForm />
        </Stack>
      </Container>
    </Box>
  );
}

export default RegisterPage;