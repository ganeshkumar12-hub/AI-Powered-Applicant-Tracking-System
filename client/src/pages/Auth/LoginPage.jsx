import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Link as RouterLink, useNavigate } from "react-router-dom";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import API from "../../services/authService";

function LoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
  try {
    setLoading(true);

    const res = await API.post("/login", formData);

    const user = res.data.user;

    // Save Login Details
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(user));

    alert("Login Successful!");

    // Redirect Based on Role
    if (user.role === "recruiter") {
      navigate("/recruiter");
    } else {
      navigate("/applicant");
    }
  } catch (err) {
    alert(err.response?.data?.message || "Login Failed");
  } finally {
    setLoading(false);
  }
};
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#2563EB,#7C3AED)",
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
              AI-Powered ATS
            </Typography>

            <Typography
              variant="h6"
              color="white"
              sx={{ opacity: 0.9 }}
            >
              Smart recruitment platform with AI resume analysis,
              candidate ranking and hiring analytics.
            </Typography>
          </Box>

          {/* Right Side */}
          <Card
            sx={{
              width: { xs: "100%", md: 450 },
              borderRadius: 5,
              boxShadow: "0 20px 50px rgba(0,0,0,.25)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h4"
                fontWeight={700}
                textAlign="center"
              >
                Welcome Back 👋
              </Typography>

              <Typography
                color="text.secondary"
                textAlign="center"
                mb={4}
              >
                Login to continue
              </Typography>

              {/* Email */}
              <TextField
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                label="Email"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Password */}
              <TextField
                fullWidth
                name="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                label="Password"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                      >
                        {showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Remember Me */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mt: 1 }}
              >
                <FormControlLabel
                  control={<Checkbox />}
                  label="Remember Me"
                />

                <Link
                  href="#"
                  underline="hover"
                >
                  Forgot Password?
                </Link>
              </Stack>

              {/* Login Button */}
              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3 }}
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              <Divider sx={{ my: 3 }} />

              <Typography textAlign="center">
                Don't have an account?{" "}
                <Link
                  component={RouterLink}
                  to="/register"
                >
                  Register
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}

export default LoginPage;