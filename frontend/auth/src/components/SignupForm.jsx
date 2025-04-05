"use client"

import { useState } from "react"
import { UserCircle, Stethoscope } from "./Icons"
import DoctorSignup from "./DoctorSignup"
import PatientSignup from "./PatientSignup"
import "./SignupForm.css"

function SignupForm({ onSwitchTab }) {
  const [role, setRole] = useState("patient")

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole)
  }

  return (
    <div className="signup-form-container">
      <div className="form-header">
        <h2 className="form-title">Create an account</h2>
        <p className="form-subtitle">Enter your information to create your account</p>
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

      <div className="signup-form-content">{role === "patient" ? <PatientSignup /> : <DoctorSignup />}</div>

      <div className="form-footer">
        <p className="switch-prompt">
          Already have an account?{" "}
          <button onClick={onSwitchTab} className="switch-link">
            Login
          </button>
        </p>
      </div>
    </div>
  )
}

export default SignupForm

