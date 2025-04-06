"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "../styles/AuthPages.css";

function PatientLoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

// Ensure this is in your PatientLoginPage.jsx or equivalent file
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  try {
    const response = await fetch("http://localhost:5000/api/login/patient", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      // Store patient details in localStorage
      localStorage.setItem("patientDetails", JSON.stringify(data.patient));

      // Navigate to the patient dashboard
      navigate("/dashboard/patient");
    } else {
      setError(data.error || "Login failed. Please try again.");
    }
  } catch (err) {
    console.error("Error during login:", err);
    setError("An error occurred. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="auth-container">
      <Link to="/" className="back-link">
        <i className="fas fa-arrow-left"></i> Back to Home
      </Link>

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <i className="fas fa-stethoscope"></i>
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to access your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button
            type="submit"
            className={`btn btn-primary btn-block ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/signup/patient">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default PatientLoginPage;