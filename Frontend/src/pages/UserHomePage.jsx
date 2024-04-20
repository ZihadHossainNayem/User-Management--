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
      <Container
        component="main"
        maxWidth="sm"
        sx={{ borderLeft: 1, borderRight: 1, borderColor: "#D3D3D3" }}
      >
        <Box sx={{ mx: 2 }}>
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
          <Typography variant="body1" sx={{ display: "flex" }}>
            <strong style={{ width: "110px" }}> Username: </strong>
            {user.username}
          </Typography>
          <Typography variant="body1" sx={{ display: "flex" }}>
            <strong style={{ width: "110px" }}> Full Name: </strong>
            {user.fullName}
          </Typography>
          <Typography variant="body1" sx={{ display: "flex" }}>
            <strong style={{ width: "110px" }}> Role: </strong> {user.role}
          </Typography>
          <Typography variant="body1" sx={{ display: "flex" }}>
            <strong style={{ width: "110px" }}> Phone: </strong> {user.phone}
          </Typography>
          <Typography variant="body1" sx={{ display: "flex" }}>
            <strong style={{ width: "110px" }}>CreatedBy:</strong>{" "}
            {user.createdBy}
          </Typography>

          <Button
            variant="outlined"
            color="error"
            onClick={handleLogout}
            sx={{ mt: 2 }}
          >
            Logout
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

UserHomePage.propTypes = {
  hubConnection: PropTypes.object.isRequired,
};
export default UserHomePage;
