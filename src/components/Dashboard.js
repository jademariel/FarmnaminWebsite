import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import "../Dashboard.css"; 

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const storedUsername = localStorage.getItem("username");

    if (!accessToken) {
      navigate("/login"); 
    } else {
      setUsername(storedUsername || "User");
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login"); 
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h2>Welcome, {username}!</h2>
        <p>This is your dashboard.</p>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
