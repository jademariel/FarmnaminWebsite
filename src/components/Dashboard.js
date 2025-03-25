import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import { FaUserCircle } from "react-icons/fa";
import "../Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const storedUsername = localStorage.getItem("loginIdentifier");

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
      {/* Navigation Bar */}
      <nav className="navbar">
        <div
          className="navbar-profile"
          onClick={() => setShowLogout(!showLogout)}
        >
          <FaUserCircle size={32} color="#fff" />
          {showLogout && (
            <span className="logout-text" onClick={handleLogout}>
              Log Out
            </span>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="dashboard-content">
        <h2>Welcome to FarmNamin, {username}!</h2>
      </div>
    </div>
  );
};

export default Dashboard;
