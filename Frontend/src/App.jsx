import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HubConnectionBuilder } from "@microsoft/signalr";
import SignInPage from "./pages/SignInPage";
import UserHomePage from "./pages/UserHomePage";
import AdminHomePage from "./pages/AdminHomePage";
import NotificationPage from "./pages/NotificationPage";

function App() {
  const [hubConnection, setHubConnection] = useState(null);

  useEffect(() => {
    const createHubConnection = async () => {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:44352/notification")
        .withAutomaticReconnect()
        .build();

      try {
        await connection.start();
        console.log("SignalR Connection Successful.");

        const userJson = localStorage.getItem("user");
        const user = JSON.parse(userJson);

        const userRole = user.role;
        console.log(userRole);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        await connection.invoke("AddUserToRoleGroup", userRole);
      } catch (err) {
        console.log("SignalR Connection Failed: ", err);
      }

      setHubConnection(connection);
    };

    createHubConnection();

    return () => {
      hubConnection
        ?.stop()
        .then(() => console.log("SignalR Connection Stopped."));
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route
          path="/user"
          element={<UserHomePage hubConnection={hubConnection} />}
        />
        <Route
          path="/admin"
          element={<AdminHomePage hubConnection={hubConnection} />}
        />
        <Route path="/notifications" element={<NotificationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
