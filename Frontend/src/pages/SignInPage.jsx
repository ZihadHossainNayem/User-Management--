import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  InputAdornment,
  Box,
  Paper,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";

import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:44352/api/User/signin",
        {
          username,
          password,
        }
      );

      console.log(response.data);
      const { user } = response.data;
      console.log(user);

      if (user.role === "Admin") {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/admin");
      } else if (user.role === "User") {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/user");
      } else {
        console.error("Invalid role");
      }
    } catch (error) {
      console.error("Sign in failed:", error.response?.data || error.message);
      alert("Invalid information!!!");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "#EEF2F6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper elevation={5}>
        <Container component="main" maxWidth="xs" sx={{ m: 4 }}>
          <div
            style={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h4" color="primary">
              <strong>Sign in</strong>
            </Typography>
            <form
              style={{ width: "100%", marginTop: 1 }}
              onSubmit={handleSignIn}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <KeyIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ margin: "24px 0px 16px" }}
              >
                Sign In
              </Button>
            </form>
          </div>
        </Container>
      </Paper>
    </Box>
  );
}

export default SignInPage;
