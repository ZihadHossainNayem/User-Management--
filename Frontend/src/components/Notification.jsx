import { useState, useEffect } from "react";
import { Badge, Box, Button, Divider, Menu, MenuItem } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Notification = ({ hubConnection }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      const user = JSON.parse(userJson);
      setIsUserAdmin(user.role === "Admin");
    }

    if (hubConnection) {
      const receiveNotification = (message) => {
        setNotifications((prevNotifications) => [
          message,
          ...prevNotifications,
        ]);
        setHasUnreadNotifications(true);
      };

      hubConnection.on("ReceiveNotification", receiveNotification);

      return () => {
        hubConnection.off("ReceiveNotification", receiveNotification);
      };
    }
  }, [hubConnection]);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setHasUnreadNotifications(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewAll = () => {
    navigate("/notifications");
  };

  return (
    <Box>
      <Badge
        badgeContent={hasUnreadNotifications ? notifications.length : null}
        color="error"
        overlap="circular"
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Button
          id="notification-button"
          aria-controls={open ? "notification-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          startIcon={<NotificationsIcon />}
        >
          Notifications
        </Button>
      </Badge>
      <Menu
        id="notification-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "notification-button",
        }}
      >
        {notifications.length === 0 ? (
          <MenuItem onClick={handleClose}>No new notifications</MenuItem>
        ) : (
          notifications.map((notification, index) => (
            <>
              <MenuItem key={index} onClick={handleClose}>
                {notification}
              </MenuItem>
              {index !== notifications.length && <Divider />}
            </>
          ))
        )}
        {isUserAdmin && (
          <Button onClick={handleViewAll} sx={{ display: "flex", mx: "auto" }}>
            View All..
          </Button>
        )}
      </Menu>
    </Box>
  );
};

Notification.propTypes = {
  hubConnection: PropTypes.object.isRequired,
};

export default Notification;
