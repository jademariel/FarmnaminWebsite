import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Intro.css";

const Intro = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/roles");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="intro-container">
      <img
        src={require("../img/official_logo.png")}
        alt="Official Logo"
        className="intro-logo"
      />
      <h1 className="intro-title">FarmNamin</h1>
    </div>
  );
};

export default Intro;
