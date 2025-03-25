import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { signup } from "../api/auth";
import { MdVisibility, MdVisibilityOff, MdArrowBack } from "react-icons/md";
import "../Signup.css";

const Signup = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "farmer";
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [headerImage, setHeaderImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (role === "farmer") {
      setHeaderImage(require("../img/farmer_user.png"));
    } else if (role === "consumer") {
      setHeaderImage(require("../img/consumer_user.png"));
    }
  }, [role]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (!agreeToTerms) {
      setMessage(
        "Please agree to the Terms and Conditions and Privacy Policy."
      ); // Add this line
      return; // Add this line
    }

    setLoading(true);

    const formattedContact = `+63${contactNumber}`;

    const response = await signup(
      username,
      email,
      formattedContact,
      password,
      confirmPassword
    );

    if (response.message) {
      setMessage("Signup successful! Redirecting to login...");
      localStorage.setItem("signupEmail", email);
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setMessage(response.error || "Signup failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        {/* Back Icon */}
        <div
          style={{
            textAlign: "left",
          }}
          onClick={() => navigate("/login")}
          title="Back to Login"
        >
          <MdArrowBack size={30} color="#218838" />
        </div>

        <div
          style={{ textAlign: "center", marginBottom: "20px", padding: "20px" }}
        >
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
                style={{ width: "60px", height: "60px", marginBottom: "10px" }}
              />
            )}
            <h2 style={{ margin: 0, color: "#218838" }}>FarmNamin</h2>
          </div>
        </div>
        <form onSubmit={handleSignup}>
          <label className="input-label" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="input-field"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label className="input-label" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email address"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="input-label" htmlFor="contact_number">
            Contact Number
          </label>
          <div className="contact-input">
            <span>+63</span>
            <input
              id="contact_number"
              type="text"
              className="input-field"
              placeholder="Enter your contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </div>

          <label className="input-label" htmlFor="password">
            Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="input-field"
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

          <label className="input-label" htmlFor="confirmPassword">
            Confirm Password
          </label>

          <div style={{ position: "relative" }}>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div
              className="password-toggle-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
              {showConfirmPassword ? (
                <MdVisibilityOff size={24} />
              ) : (
                <MdVisibility size={24} />
              )}
            </div>
          </div>

          {/* Terms & Conditions Checkbox */}
          <div className="terms-container">
            <input
              type="checkbox"
              id="terms"
              style={{ marginBottom: "5px", justifyContent: "center" }}
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
            />
            <label
              style={{ marginBottom: "5px", justifyContent: "center" }}
              htmlFor="terms"
            >
              I agree to the <Link to="/terms">Terms and Conditions</Link> and{" "}
              <Link to="/privacy">Privacy Policy</Link>
            </label>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default Signup;
