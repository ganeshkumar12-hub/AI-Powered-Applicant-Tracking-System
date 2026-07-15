import { Box, Container, Grid, Paper, Typography } from "@mui/material";

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "IBM",
  "Infosys",
  "TCS",
];

function Companies() {
  return (
    <Box sx={{ py: 8, bgcolor: "#ffffff" }}>
      <Container maxWidth="lg">

        <Typography
          variant="h5"
          textAlign="center"
          fontWeight={700}
          mb={5}
        >
          Trusted by Leading Companies
        </Typography>

        <Grid container spacing={3}>
          {companies.map((company) => (
            <Grid
              key={company}
              size={{ xs: 6, sm: 4, md: 2 }}
            >
              <Paper
                elevation={2}
                sx={{
                  py: 3,
                  textAlign: "center",
                  borderRadius: 3,
                  fontWeight: 600,
                }}
              >
                {company}
              </Paper>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
}

export default Companies;