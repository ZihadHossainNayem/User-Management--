import { useEffect, useState } from "react";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
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
    <Box sx={{ mt: 4 }}>
      <Container
        component="main"
        maxWidth="md"
        sx={{ borderLeft: 1, borderRight: 1, borderColor: "#D3D3D3" }}
      >
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
    </Box>
  );
};

export default NotificationPage;
