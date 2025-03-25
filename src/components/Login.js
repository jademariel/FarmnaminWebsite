import { useState } from "react";
import { login } from "../api/auth";
import { Link, useNavigate } from "react-router-dom"; 
import "../Login.css"; 

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login(username, password);
    
    if (response.tokens) {
      localStorage.setItem("username", username); 
      navigate("/dashboard"); 
    } else {
      setMessage(response.error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src={require('../img/official_logo.png')} alt="FarmNamin Logo" style={{ width: '100px', height: '100px' }} />
        </div>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>FarmNamin Login</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit">Login</button>
        </form>
        <p className="message">{message}</p>
        <p className="signup-text">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
