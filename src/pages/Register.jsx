import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    profile_picture: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "profile_picture") {
      const file = e.target.files[0];
      setFormData({ ...formData, profile_picture: file });
      if (file) setPreviewUrl(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleRegister = async () => {
    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match");
      return;
    }

    try {
      const data = new FormData();
      data.append("username", formData.username);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("first_name", formData.first_name);
      data.append("last_name", formData.last_name);
      if (formData.profile_picture) data.append("profile_picture", formData.profile_picture);

      await API.post("accounts/register/", data);

      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="register-page">
      <div className="register-card" role="region" aria-label="Register form">
        <img src="/footer.svg" alt="icon" className="register-top-icon" />

        <div className="register-title">
          <div className="register-icon" aria-hidden>
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.686 2 6 4.686 6 8c0 3.314 2.686 6 6 6s6-2.686 6-6c0-3.314-2.686-6-6-6z" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 22c0-3.314 2.686-6 6-6h4c3.314 0 6 2.686 6 6" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2>Register</h2>
        </div>

        <div className="register-avatar-row">
          <div className="register-avatar">
            {previewUrl ? (
              <img src={previewUrl} alt="profile preview" className="register-avatar-img" />
            ) : (
              <div className="register-avatar-placeholder">PP</div>
            )}
          </div>
          <label htmlFor="profile_picture" className="register-file-label">Choose profile photo</label>
          <input id="profile_picture" className="register-file-input" type="file" name="profile_picture" accept="image/*" onChange={handleChange} />
        </div>

        <input name="first_name" className="register-input" placeholder="First name" value={formData.first_name} onChange={handleChange} />

        <input name="last_name" className="register-input" placeholder="Last name" value={formData.last_name} onChange={handleChange} />

        <input name="username" className="register-input" placeholder="Username" value={formData.username} onChange={handleChange} />

        <input name="email" className="register-input" placeholder="Email" value={formData.email} onChange={handleChange} />

        <input className="register-input" name="password" type={showPassword ? "text" : "password"} placeholder="Password" value={formData.password} onChange={handleChange} />

        <input className="register-input" name="confirm_password" type={showPassword ? "text" : "password"} placeholder="Confirm password" value={formData.confirm_password} onChange={handleChange} />

        <div className="register-checkbox-row">
          <input id="show-pass-register" className="register-checkbox" type="checkbox" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} />
          <label htmlFor="show-pass-register">Show password</label>
        </div>


        <button className="register-button" onClick={handleRegister}>Register</button>

        <p className="register-link" onClick={() => navigate("/")}>Already have an account? Login</p>
      </div>
    </div>
  );
}
