import { useEffect, useState } from "react";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44352/api/Notification"
        );
        setNotifications(response.data);
      } catch (error) {
        console.error("There was an error fetching the notifications: ", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <Box
      sx={{
        py: 4,
        backgroundColor: "#EEF2F6",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper elevation={4} sx={{ width: "60%" }}>
        <Container component="main" maxWidth="lg" sx={{ py: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            Notifications
          </Typography>
          {notifications.length ? (
            <List>
              {notifications.map((notification, index) => (
                <ListItem key={index} divider>
                  <ListItemText primary={notification.content} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="subtitle1">
              No notifications to display
            </Typography>
          )}
        </Container>
      </Paper>
    </Box>
  );
};

export default NotificationPage;
