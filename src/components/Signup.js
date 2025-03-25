import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/auth"; 
import "../Signup.css"; 

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const response = await signup(username, password);
    
    if (response.message) {
      setMessage("Signup successful! Redirecting to login...");

      localStorage.setItem("signupUsername", username);

      setTimeout(() => navigate("/login"), 1500);
    } else {
      setMessage(response.error || "Signup failed. Try again.");
    }
    
    setLoading(false);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img src={require('../img/official_logo.png')} alt="FarmNamin Logo" style={{ width: '100px', height: '100px' }} />
        </div>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>FarmNamin Signup</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            style={{
                width: '100%',
                padding: '10px',
                margin: '10px 0',
                border: '1px solid #ccc',
                borderRadius: '4px',
                outline: 'none',
                transition: 'border-color 0.3s',
                boxSizing: 'border-box',
                fontSize: '16px'
            }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            style={{
                width: '100%',
                padding: '10px',
                margin: '10px 0',
                border: '1px solid #ccc',
                borderRadius: '4px',
                outline: 'none',
                transition: 'border-color 0.3s',
                boxSizing: 'border-box',
                fontSize: '16px'
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="message">{message}</p>
        <p className="login-text">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
