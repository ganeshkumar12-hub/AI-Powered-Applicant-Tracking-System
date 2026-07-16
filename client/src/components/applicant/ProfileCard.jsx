import {
  Avatar,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

function ProfileCard() {
  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
        mt: 4,
      }}
    >
      <Stack
        spacing={2}
        alignItems="center"
      >
        <Avatar
          sx={{
            width: 90,
            height: 90,
            bgcolor: "#2563EB",
            fontSize: 36,
          }}
        >
          {user.name?.charAt(0).toUpperCase() || "A"}
        </Avatar>

        <Typography
          variant="h5"
          fontWeight="bold"
        >
          {user.name || "Applicant"}
        </Typography>

        <Typography color="text.secondary">
          {user.email}
        </Typography>
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Box mb={2}>
        <Typography variant="subtitle2">
          Role
        </Typography>

        <Typography>
          {user.role}
        </Typography>
      </Box>

      <Box mb={2}>
        <Typography variant="subtitle2">
          Phone
        </Typography>

        <Typography>
          {user.phone || "Not Added"}
        </Typography>
      </Box>

      <Box mb={2}>
        <Typography variant="subtitle2">
          Company
        </Typography>

        <Typography>
          {user.company || "N/A"}
        </Typography>
      </Box>

      <Button
        fullWidth
        variant="contained"
      >
        Edit Profile
      </Button>
    </Paper>
  );
}

export default ProfileCard;