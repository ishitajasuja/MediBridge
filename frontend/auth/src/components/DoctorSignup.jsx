"use client"

import { useState } from "react"
import "./DoctorSignup.css"

function DoctorSignup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    specialization: "",
    clinicAddress: "",
    registrationNumber: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match")
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      console.log("Doctor signup:", formData)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="doctor-form">
      <div className="form-group">
        <label htmlFor="fullName" className="form-label">
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          className="form-input"
          placeholder="Dr. John Doe"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-input"
            placeholder="doctor@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobile" className="form-label">
            Mobile Number
          </label>
          <input
            id="mobile"
            name="mobile"
            className="form-input"
            placeholder="+1234567890"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="specialization" className="form-label">
          Specialization
        </label>
        <select
          id="specialization"
          name="specialization"
          className="form-select"
          value={formData.specialization}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select your specialization
          </option>
          <option value="cardiology">Cardiology</option>
          <option value="dermatology">Dermatology</option>
          <option value="neurology">Neurology</option>
          <option value="orthopedics">Orthopedics</option>
          <option value="pediatrics">Pediatrics</option>
          <option value="psychiatry">Psychiatry</option>
          <option value="general">General Medicine</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="clinicAddress" className="form-label">
          Clinic Address
        </label>
        <textarea
          id="clinicAddress"
          name="clinicAddress"
          className="form-textarea"
          placeholder="123 Medical Plaza, Suite 456, City, State, ZIP"
          value={formData.clinicAddress}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="registrationNumber" className="form-label">
          Medical Registration Number
        </label>
        <input
          id="registrationNumber"
          name="registrationNumber"
          className="form-input"
          placeholder="MED12345678"
          value={formData.registrationNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="form-input"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <button type="submit" className="submit-button" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create Doctor Account"}
      </button>
    </form>
  )
}

export default DoctorSignup

