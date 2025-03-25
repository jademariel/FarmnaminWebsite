import { useState, useEffect } from "react";
import { login } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { MdClose, MdVisibility, MdVisibilityOff } from "react-icons/md";
import "../Login.css";

const Login = () => {
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [headerImage, setHeaderImage] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("selectedRole");
    if (role === "farmer") {
      setHeaderImage(require("../img/farmer_user.png"));
    } else if (role === "consumer") {
      setHeaderImage(require("../img/consumer_user.png"));
    } else {
      // Default image if role is not found
      setHeaderImage(require("../img/farmer_user.png"));
    }
  }, []);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login(loginIdentifier, password);

    if (response.tokens) {
      localStorage.setItem("loginIdentifier", loginIdentifier);
      navigate("/dashboard");
    } else {
      setMessage(response.error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Header Section */}
        <div
          style={{ textAlign: "center", marginBottom: "20px", padding: "20px" }}
        >
          <h2 style={{ margin: 0, color: "#218838" }}>Welcome</h2>
          <h2 style={{ marginBottom: "-10px", color: "#218838" }}>to</h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {headerImage && (
              <img
                src={headerImage}
                alt="Role Logo"
                style={{ width: "80px", height: "80px", marginRight: "10px" }}
              />
            )}
            <h2 style={{ margin: 0, color: "#218838" }}>FarmNamin</h2>
          </div>
        </div>

        <form onSubmit={handleLogin}>
          <label className="input-label" htmlFor="loginIdentifier">
            Username or Email Address
          </label>

          <div style={{ position: "relative" }}>
            <input
              id="loginIdentifier"
              className="input-field"
              type="text"
              placeholder="Enter your username or email"
              value={loginIdentifier}
              onChange={(e) => setLoginIdentifier(e.target.value)}
              required
            />
            {loginIdentifier && (
              <MdClose
                className="input-clear-icon"
                onClick={() => setLoginIdentifier("")}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "30%",
                  transform: "translateY(-30%)",
                  fontSize: "25px",
                  color: "#218838",
                  cursor: "pointer",
                }}
              />
            )}
          </div>

          <label className="input-label" htmlFor="password">
            Password
          </label>

          <div style={{ position: "relative" }}>
            <input
              id="password"
              className="input-field"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "30%",
                transform: "translateY(-30%)",
                fontSize: "25px",
                color: "#218838",
                cursor: "pointer",
              }}
            >
              {showPassword ? (
                <MdVisibilityOff size={24} />
              ) : (
                <MdVisibility size={24} />
              )}
            </div>
          </div>

          <p className="forgot-text">
            <Link to="/forgotpassword">Forgot password?</Link>
          </p>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <p className="message">{message}</p>
        <p className="signup-text">
          Don't have an account?{" "}
          <Link
            to={`/signup?role=${
              localStorage.getItem("selectedRole") || "farmer"
            }`}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
