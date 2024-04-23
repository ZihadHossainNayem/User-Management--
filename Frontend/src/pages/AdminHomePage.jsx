import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  InputAdornment,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import BadgeIcon from "@mui/icons-material/Badge";
import Notification from "../components/Notification";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      smd: 700,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

const AdminHomePage = ({ hubConnection }) => {
  const [admin, setAdmin] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    role: "User",
    phone: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedAdminInfo = localStorage.getItem("user");
    if (storedAdminInfo) {
      setAdmin(JSON.parse(storedAdminInfo));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adminInfo = JSON.parse(localStorage.getItem("user"));
    const dataToSubmit = { ...formData, createdBy: adminInfo.username };

    try {
      const response = await axios.post(
        "https://localhost:44352/api/CreateUser",
        dataToSubmit
      );
      console.log(response.data);
      alert("User created successfully.");
    } catch (error) {
      console.error(
        "Error creating user:",
        error.response?.data || error.message
      );
      alert("Failed to create user.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleReport = async () => {
    try {
      const response = await axios.get(
        "https://localhost:44352/api/ReportGenerate/user-report",
        {
          responseType: "blob", // response type is blob for PDF....
        }
      );

      // new FileReader here....
      const reader = new FileReader();

      reader.onload = () => {
        const newWindow = window.open("");
        // set the content of the new window to the data URL containing the PDF....
        newWindow.document.write(
          `<iframe src="${reader.result}" style="width:100%;height:100%;"></iframe>`
        );
      };

      // read the blob data as a data URL...
      reader.readAsDataURL(response.data);
    } catch (error) {
      console.error("Error generating user report:", error);
    }
  };

  if (!admin) return <div>Loading admin information...</div>;

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "#EEF2F6",
          height: "100%",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container component="main" maxWidth="smd" sx={{ py: 4 }}>
          <Paper elevation={5}>
            <Box sx={{ mx: 6, py: 6 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    color: "#36454F",
                    fontWeight: "700",
                    fontSize: {
                      xs: "1.5rem",
                      sm: "2.0rem",
                    },
                  }}
                  gutterBottom
                >
                  Admin Information
                </Typography>
                <Notification hubConnection={hubConnection} />
              </Box>
              <Typography
                variant="body1"
                sx={{ display: "flex", color: "#36454F" }}
              >
                <strong style={{ width: "110px" }}>Username:</strong>
                {admin.username}
              </Typography>
              <Typography
                variant="body1"
                sx={{ display: "flex", color: "#36454F" }}
              >
                <strong style={{ width: "110px" }}>Full Name: </strong>
                {admin.fullName}
              </Typography>
              <Typography
                variant="body1"
                sx={{ display: "flex", color: "#36454F" }}
              >
                <strong style={{ width: "110px" }}>Role:</strong> {admin.role}
              </Typography>
              <Typography
                variant="body1"
                sx={{ display: "flex", color: "#36454F" }}
              >
                <strong style={{ width: "110px" }}>Phone:</strong> {admin.phone}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#36454F",
                }}
              >
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleLogout}
                  sx={{ mt: 2 }}
                >
                  Logout
                </Button>

                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleReport}
                  sx={{ mt: 2 }}
                >
                  Users Information Report
                </Button>
              </Box>

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: "500" }}
                >
                  Create New User
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <KeyIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <BadgeIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  select
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </TextField>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <PhoneEnabledIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Create User
                </Button>
              </Box>
            </Box>{" "}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

AdminHomePage.propTypes = {
  hubConnection: PropTypes.object.isRequired,
};
export default AdminHomePage;
