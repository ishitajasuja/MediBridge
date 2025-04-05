"use client"

import { useState } from "react"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import MedicalCross from "./MedicalCross"
import "./AuthPage.css"

function AuthPage() {
  const [activeTab, setActiveTab] = useState("login")

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  return (
    <div className="auth-container">
      {/* Left side - Branding */}
      <div className="auth-branding">
        <div className="branding-content">
          <div className="logo-container">
            <MedicalCross className="logo-icon" />
            <h1 className="logo-text">MediBridge</h1>
          </div>

          <div className="branding-message">
            <h2 className="branding-title">Your Health, Our Priority</h2>
            <p className="branding-subtitle">
              Connect with top doctors or manage your patient records in one secure platform.
            </p>
            <div className="branding-dots">
              <div className="dot active"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth Forms */}
      <div className="auth-forms">
        <div className="mobile-logo">
          <MedicalCross className="mobile-logo-icon" />
          <h1 className="mobile-logo-text">HealthConnect</h1>
        </div>

        <div className="tabs">
          <div className="tab-list">
            <button
              className={`tab-button ${activeTab === "login" ? "active" : ""}`}
              onClick={() => handleTabChange("login")}
            >
              Login
            </button>
            <button
              className={`tab-button ${activeTab === "signup" ? "active" : ""}`}
              onClick={() => handleTabChange("signup")}
            >
              Sign Up
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "login" && (
              <div className="tab-panel animate-fade">
                <LoginForm onSwitchTab={() => handleTabChange("signup")} />
              </div>
            )}

            {activeTab === "signup" && (
              <div className="tab-panel animate-fade">
                <SignupForm onSwitchTab={() => handleTabChange("login")} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage

