import {
  Dashboard,
  Work,
  Description,
  Assignment,
  Person,
  Logout,
  Group,
} from "@mui/icons-material";

import {
  Box,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const applicantMenu = [
    {
      text: "Dashboard",
      icon: <Dashboard />,
      path: "/applicant",
    },
    {
      text: "Jobs",
      icon: <Work />,
      path: "/jobs",
    },
    {
      text: "Resume",
      icon: <Description />,
      path: "/resume",
    },
    {
      text: "Applications",
      icon: <Assignment />,
      path: "/applications",
    },
    {
      text: "Profile",
      icon: <Person />,
      path: "/profile",
    },
  ];

  const recruiterMenu = [
    {
      text: "Dashboard",
      icon: <Dashboard />,
      path: "/recruiter",
    },
    {
      text: "Jobs",
      icon: <Work />,
      path: "/jobs",
    },
    {
      text: "Applicants",
      icon: <Group />,
      path: "/recruiter",
    },
    {
      text: "Profile",
      icon: <Person />,
      path: "/profile",
    },
  ];

  const menuItems =
    user?.role === "recruiter" ? recruiterMenu : applicantMenu;

  return (
    <Box
      sx={{
        width: 260,
        height: "100vh",
        bgcolor: "#1E293B",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      <Box>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            p: 3,
            textAlign: "center",
            borderBottom: "1px solid #334155",
          }}
        >
          AI ATS
        </Typography>

        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                color: "white",
                "&:hover": {
                  bgcolor: "#334155",
                },
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>
                {item.icon}
              </ListItemIcon>

              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          color="error"
          startIcon={<Logout />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}

export default Sidebar;