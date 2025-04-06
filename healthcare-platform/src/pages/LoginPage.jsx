"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/AuthPages.css"

function LoginPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("patient")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      // Redirect based on user type
      if (activeTab === "patient") {
        navigate("/dashboard/patient")
      } else {
        navigate("/dashboard/doctor")
      }
    }, 1500)
  }

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
          <h1>Welcome back</h1>
          <p>Enter your credentials to access your account</p>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${activeTab === "patient" ? "active" : ""}`}
            onClick={() => setActiveTab("patient")}
          >
            Patient
          </button>
          <button
            className={`auth-tab ${activeTab === "doctor" ? "active" : ""}`}
            onClick={() => setActiveTab("doctor")}
          >
            Doctor
          </button>
        </div>

        <div className="auth-content">
          <h2>{activeTab === "patient" ? "Patient Login" : "Doctor Login"}</h2>
          <p>
            {activeTab === "patient"
              ? "Access your medical records and appointments"
              : "Access your patient records and appointments"}
          </p>

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
              <div className="password-header">
                <label htmlFor="password">Password</label>
                <Link to="/reset-password" className="forgot-password">
                  Forgot password?
                </Link>
              </div>
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

            <div className="form-check">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>

            <button
              type="submit"
              className={`btn btn-primary btn-block ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="auth-footer">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

