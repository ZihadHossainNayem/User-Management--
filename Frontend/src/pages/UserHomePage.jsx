import { Box, Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification";
import PropTypes from "prop-types";

const UserHomePage = ({ hubConnection }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("user");
    if (storedUserInfo) {
      setUser(JSON.parse(storedUserInfo));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return <div>Loading...</div>;

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
            User Information
          </Typography>
          <Notification hubConnection={hubConnection} />
        </Box>
        <Typography variant="body1">Username: {user.username}</Typography>
        <Typography variant="body1">Full Name: {user.fullName}</Typography>
        <Typography variant="body1">Role: {user.role}</Typography>
        <Typography variant="body1">Phone: {user.phone}</Typography>
        <Typography variant="body1">CreatedBy: {user.createdBy}</Typography>

        <Button
          variant="outlined"
          color="secondary"
          onClick={handleLogout}
          sx={{ mt: 2 }}
        >
          Logout
        </Button>
      </Container>
    </Box>
  );
};

UserHomePage.propTypes = {
  hubConnection: PropTypes.object.isRequired,
};
export default UserHomePage;
