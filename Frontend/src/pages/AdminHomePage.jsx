import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import BadgeIcon from "@mui/icons-material/Badge";
import Notification from "../components/Notification";

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

  const handleReport = () => {};

  if (!admin) return <div>Loading admin information...</div>;

  return (
    <Box sx={{ mt: 4 }}>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "700" }} gutterBottom>
            Admin Information
          </Typography>
          <Notification hubConnection={hubConnection} />
        </Box>
        <Typography variant="body1">Username: {admin.username}</Typography>
        <Typography variant="body1">Full Name: {admin.fullName}</Typography>
        <Typography variant="body1">Role: {admin.role}</Typography>
        <Typography variant="body1">Phone: {admin.phone}</Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            color="secondary"
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
            Get Users Information
          </Button>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
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
      </Container>
    </Box>
  );
};

AdminHomePage.propTypes = {
  hubConnection: PropTypes.object.isRequired,
};
export default AdminHomePage;
