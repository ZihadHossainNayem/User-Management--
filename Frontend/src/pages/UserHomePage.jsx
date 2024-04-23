import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification";
import PropTypes from "prop-types";
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
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "#EEF2F6",
          height: "100%",
          minHeight: "100vh",
          py: 4,
        }}
      >
        <Container component="main" maxWidth="md">
          <Paper elevation={5}>
            <Box sx={{ mx: 3, py: 4 }}>
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
                  sx={{ fontWeight: "700", color: "#36454F" }}
                  gutterBottom
                >
                  User Information
                </Typography>
                <Notification hubConnection={hubConnection} />
              </Box>
              <Typography
                variant="body1"
                sx={{ display: "flex", color: "#36454F" }}
              >
                <strong style={{ width: "110px" }}> Username: </strong>
                {user.username}
              </Typography>
              <Typography
                variant="body1"
                sx={{ display: "flex", color: "#36454F" }}
              >
                <strong style={{ width: "110px" }}> Full Name: </strong>
                {user.fullName}
              </Typography>
              <Typography
                variant="body1"
                sx={{ display: "flex", color: "#36454F" }}
              >
                <strong style={{ width: "110px" }}> Role: </strong> {user.role}
              </Typography>
              <Typography
                variant="body1"
                sx={{ display: "flex", color: "#36454F" }}
              >
                <strong style={{ width: "110px" }}> Phone: </strong>{" "}
                {user.phone}
              </Typography>
              <Typography
                variant="body1"
                sx={{ display: "flex", color: "#36454F" }}
              >
                <strong style={{ width: "110px" }}>CreatedBy:</strong>
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
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

UserHomePage.propTypes = {
  hubConnection: PropTypes.object.isRequired,
};
export default UserHomePage;
