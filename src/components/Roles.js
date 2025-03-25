import React from "react";
import { useNavigate } from "react-router-dom";
import "../Roles.css";

const Roles = () => {
  const navigate = useNavigate();

  const handleSelectRole = (role) => {
    localStorage.setItem("selectedRole", role);

    navigate("/login");
  };

  return (
    <div className="roles-container">
      {/* First Row: Two images */}
      <div className="roles-row images-row">
        <img
          src={require("../img/consumer_user.png")}
          alt="Consumer"
          className="role-image"
          onClick={() => handleSelectRole("consumer")}
        />
        <img
          src={require("../img/farmer_user.png")}
          alt="Farmer"
          className="role-image"
          onClick={() => handleSelectRole("farmer")}
        />
      </div>

      {/* Second Row: Two clickable text options */}
      <div className="roles-row texts-row">
        <div className="role-text" onClick={() => handleSelectRole("consumer")}>
          Yes, I am.
        </div>
        <div className="role-text" onClick={() => handleSelectRole("farmer")}>
          Of Course
        </div>
      </div>

      {/* Third Row: The question */}
      <div className="roles-row question-row">
        <h2>Are you a farmer or consumer?</h2>
      </div>
    </div>
  );
};

export default Roles;
