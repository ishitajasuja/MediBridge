"use client"

import { useState } from "react"
import { UserCircle, Stethoscope } from "./Icons"
import "./LoginForm.css"

function LoginForm({ onSwitchTab }) {
  const [role, setRole] = useState("patient")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      console.log("Login attempt:", { role, email, password })
    }, 1000)
  }

  return (
    <div className="login-form-container">
      <div className="form-header">
        <h2 className="form-title">Welcome back</h2>
        <p className="form-subtitle">Enter your credentials to access your account</p>
      </div>

      <div className="role-tabs">
        <button
          className={`role-tab ${role === "patient" ? "active" : ""}`}
          onClick={() => handleRoleChange("patient")}
        >
          <UserCircle className="role-icon" />
          <span>Patient</span>
        </button>
        <button className={`role-tab ${role === "doctor" ? "active" : ""}`} onClick={() => handleRoleChange("doctor")}>
          <Stethoscope className="role-icon" />
          <span>Doctor</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email or Mobile Number
          </label>
          <input
            id="email"
            type="text"
            className="form-input"
            placeholder="name@example.com or +1234567890"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <div className="password-header">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <a href="/forgot-password" className="forgot-password">
              Forgot password?
            </a>
          </div>
          <input
            id="password"
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="form-footer">
        <p className="switch-prompt">
          Don't have an account?{" "}
          <button onClick={onSwitchTab} className="switch-link">
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}

export default LoginForm

