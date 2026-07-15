import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

function Navbar() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "white",
        color: "black",
        borderBottom: "1px solid #E2E8F0",
      }}
    >
      <Toolbar
        sx={{
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "primary.main",
          }}
        >
          AI ATS
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Button color="inherit">Home</Button>

        <Button color="inherit">Jobs</Button>

        <Button color="inherit">About</Button>

        <Button variant="contained">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;