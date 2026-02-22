import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { setupTokenRefresh } from "../services/tokenService";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await API.post("accounts/login/", {
        username,
        password,
      });

      // Store tokens in localStorage
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("username", username);

      console.log("✅ Login successful - Starting token refresh service");
      
      // Start proactive token refresh
      setupTokenRefresh();

      navigate("/home");
    } catch (err) {
      alert("Invalid credentials");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card" role="region" aria-label="Login form">
        <img src="/footer.svg" alt="icon" className="card-top-icon" />
        <div className="login-title">
          <div className="icon" aria-hidden>
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.686 2 6 4.686 6 8c0 3.314 2.686 6 6 6s6-2.686 6-6c0-3.314-2.686-6-6-6z" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 22c0-3.314 2.686-6 6-6h4c3.314 0 6 2.686 6 6" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2>Login</h2>
        </div>

        <label className="sr-only">Username</label>
        <input
          className="inputs"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="sr-only">Password</label>
        <input
          className="inputs"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="checkbox-row">
          <input
            id="show-pass"
            type="checkbox"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
          />
          <label htmlFor="show-pass">Show password</label>
        </div>

        <button className="login-button" onClick={handleLogin} aria-label="Login">
          Login
        </button>

        <p className="register-link" onClick={() => navigate("/register")}>
          Don't have an account? Register
        </p>
      </div>
    </div>
  );
}
