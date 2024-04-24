## Introduction
This project aims to provide a user management system with features for user creation, authentication, and notification functionalities. It consists of a frontend application built with React and a backend API developed using ASP.NET Core.

### Technologies Used:

#### Frontend:
- React.js
- Material-UI for styling
- React Router for navigation

#### Backend:
- ASP.NET Core
- Entity Framework Core for database operations
- SignalR for real-time communication

#### Reporting:
- DevExpress Reporting Tools


## ProjectFlow

The frontend communicates with the backend API to perform various user-related tasks such as signing in, creating users, and fetching notifications and generating reports. Real-time notifications are implemented using SignalR, allowing administrators to receive immediate updates.

## Functionalities

### Frontend:
- **Sign In Page:** Allows users to sign in with their credentials.
- **Admin Dashboard:** Provides administrators with the ability to view user information, create new users, and receive real-time notifications.
- **User Dashboard:** Allows regular users to view their own information.

### Backend:
- **User Management API:** Endpoints for user authentication, creation, and notification retrieval.
- **Notification Hub:** Facilitates real-time communication between the server and connected clients for instant notification delivery.

### Reporting:
- **DevExpress Reporting Tool Integration: Added functionality for administrators to generate reports on user information. Administrators can access reports through the Admin Dashboard.
