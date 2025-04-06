"use client"

import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import "../styles/AuthPages.css"

function CreateProfilePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const userType = searchParams.get("type") || "patient"

  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const totalSteps = userType === "patient" ? 3 : 2

  const [formData, setFormData] = useState({
    // Basic info
    profilePicture: null,
    firstName: "",
    lastName: "",
    dob: "",
    gender: "male",
    phone: "",

    // Medical history (patient)
    chronicConditions: "",
    allergies: "",
    currentMedications: "",
    familyHistory: "",

    // Lifestyle (patient)
    smoking: "never",
    alcohol: "none",
    exercise: "moderate",
    diet: "no-restrictions",

    // Professional info (doctor)
    licenseNumber: "",
    hospital: "",

    // Specialization (doctor)
    specialization: "general",
    experience: "",
    education: "",
    bio: "",
  })

  const handleChange = (e) => {
    const { name, value, type, files } = e.target

    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = () => {
    setIsLoading(true)

    // Simulate profile creation
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to dashboard
      navigate(userType === "patient" ? "/dashboard/patient" : "/dashboard/doctor")
    }, 1500)
  }

  return (
    <div className="auth-container">
      <Link to="/signup" className="back-link">
        <i className="fas fa-arrow-left"></i> Back to Signup
      </Link>

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <i className="fas fa-stethoscope"></i>
          </div>
          <h1>Complete Your Profile</h1>
          <p>
            {userType === "patient"
              ? "Tell us more about yourself to personalize your experience"
              : "Complete your professional profile to connect with patients"}
          </p>
        </div>

        <div className="profile-steps">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={`profile-step ${step > i + 1 ? "completed" : step === i + 1 ? "active" : ""}`}>
              <div className="step-number">{step > i + 1 ? <i className="fas fa-check"></i> : i + 1}</div>
              <div className="step-label">
                {userType === "patient"
                  ? i === 0
                    ? "Basic Info"
                    : i === 1
                      ? "Medical History"
                      : "Lifestyle"
                  : i === 0
                    ? "Professional Info"
                    : "Specialization"}
              </div>
            </div>
          ))}
        </div>

        <div className="auth-content">
          <h2>
            {userType === "patient"
              ? step === 1
                ? "Basic Information"
                : step === 2
                  ? "Medical History"
                  : "Lifestyle Information"
              : step === 1
                ? "Professional Information"
                : "Specialization & Experience"}
          </h2>
          <p>{step === totalSteps ? "Last step to complete your profile" : `Step ${step} of ${totalSteps}`}</p>

          <form>
            {userType === "patient" ? (
              // Patient Profile Steps
              <>
                {step === 1 && (
                  <>
                    <div className="upload-area">
                      <input type="file" id="profilePicture" name="profilePicture" onChange={handleChange} />
                      <label htmlFor="profilePicture">
                        <i className="fas fa-upload"></i>
                        <span>Upload Photo</span>
                      </label>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          className="form-control"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          className="form-control"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="dob">Date of Birth</label>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        className="form-control"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Gender</label>
                      <div className="radio-group">
                        <div className="radio-option">
                          <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            checked={formData.gender === "male"}
                            onChange={handleChange}
                          />
                          <label htmlFor="male">Male</label>
                        </div>

                        <div className="radio-option">
                          <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            checked={formData.gender === "female"}
                            onChange={handleChange}
                          />
                          <label htmlFor="female">Female</label>
                        </div>

                        <div className="radio-option">
                          <input
                            type="radio"
                            id="other"
                            name="gender"
                            value="other"
                            checked={formData.gender === "other"}
                            onChange={handleChange}
                          />
                          <label htmlFor="other">Other</label>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="form-group">
                      <label htmlFor="chronicConditions">Chronic Conditions</label>
                      <textarea
                        id="chronicConditions"
                        name="chronicConditions"
                        className="form-control"
                        placeholder="List any chronic conditions you have (e.g., diabetes, hypertension)"
                        value={formData.chronicConditions}
                        onChange={handleChange}
                        rows="3"
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <label htmlFor="allergies">Allergies</label>
                      <textarea
                        id="allergies"
                        name="allergies"
                        className="form-control"
                        placeholder="List any allergies you have (e.g., medications, food, environmental)"
                        value={formData.allergies}
                        onChange={handleChange}
                        rows="3"
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <label htmlFor="currentMedications">Current Medications</label>
                      <textarea
                        id="currentMedications"
                        name="currentMedications"
                        className="form-control"
                        placeholder="List any medications you are currently taking"
                        value={formData.currentMedications}
                        onChange={handleChange}
                        rows="3"
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <label htmlFor="familyHistory">Family Medical History</label>
                      <textarea
                        id="familyHistory"
                        name="familyHistory"
                        className="form-control"
                        placeholder="List any significant medical conditions in your family"
                        value={formData.familyHistory}
                        onChange={handleChange}
                        rows="3"
                      ></textarea>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className="form-group">
                      <label htmlFor="smoking">Smoking Habits</label>
                      <select
                        id="smoking"
                        name="smoking"
                        className="form-control"
                        value={formData.smoking}
                        onChange={handleChange}
                      >
                        <option value="never">Never smoked</option>
                        <option value="former">Former smoker</option>
                        <option value="occasional">Occasional smoker</option>
                        <option value="regular">Regular smoker</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="alcohol">Alcohol Consumption</label>
                      <select
                        id="alcohol"
                        name="alcohol"
                        className="form-control"
                        value={formData.alcohol}
                        onChange={handleChange}
                      >
                        <option value="none">None</option>
                        <option value="occasional">Occasional</option>
                        <option value="moderate">Moderate</option>
                        <option value="heavy">Heavy</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="exercise">Exercise Frequency</label>
                      <select
                        id="exercise"
                        name="exercise"
                        className="form-control"
                        value={formData.exercise}
                        onChange={handleChange}
                      >
                        <option value="none">None</option>
                        <option value="light">Light (1-2 days/week)</option>
                        <option value="moderate">Moderate (3-5 days/week)</option>
                        <option value="active">Active (6-7 days/week)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="diet">Dietary Preferences</label>
                      <select
                        id="diet"
                        name="diet"
                        className="form-control"
                        value={formData.diet}
                        onChange={handleChange}
                      >
                        <option value="no-restrictions">No restrictions</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="gluten-free">Gluten-free</option>
                        <option value="dairy-free">Dairy-free</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </>
                )}
              </>
            ) : (
              // Doctor Profile Steps
              <>
                {step === 1 && (
                  <>
                    <div className="upload-area">
                      <input type="file" id="profilePicture" name="profilePicture" onChange={handleChange} />
                      <label htmlFor="profilePicture">
                        <i className="fas fa-upload"></i>
                        <span>Upload Photo</span>
                      </label>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          className="form-control"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          className="form-control"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="licenseNumber">Medical License Number</label>
                      <input
                        type="text"
                        id="licenseNumber"
                        name="licenseNumber"
                        className="form-control"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="hospital">Primary Hospital/Clinic</label>
                      <input
                        type="text"
                        id="hospital"
                        name="hospital"
                        className="form-control"
                        value={formData.hospital}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Contact Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="form-group">
                      <label htmlFor="specialization">Specialization</label>
                      <select
                        id="specialization"
                        name="specialization"
                        className="form-control"
                        value={formData.specialization}
                        onChange={handleChange}
                      >
                        <option value="general">General Practitioner</option>
                        <option value="cardiology">Cardiology</option>
                        <option value="dermatology">Dermatology</option>
                        <option value="neurology">Neurology</option>
                        <option value="orthopedics">Orthopedics</option>
                        <option value="pediatrics">Pediatrics</option>
                        <option value="psychiatry">Psychiatry</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="experience">Years of Experience</label>
                      <input
                        type="number"
                        id="experience"
                        name="experience"
                        className="form-control"
                        min="0"
                        value={formData.experience}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="education">Education & Qualifications</label>
                      <textarea
                        id="education"
                        name="education"
                        className="form-control"
                        placeholder="List your degrees, certifications, and qualifications"
                        value={formData.education}
                        onChange={handleChange}
                        rows="3"
                        required
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <label htmlFor="bio">Professional Bio</label>
                      <textarea
                        id="bio"
                        name="bio"
                        className="form-control"
                        placeholder="Write a short professional bio that will be visible to patients"
                        value={formData.bio}
                        onChange={handleChange}
                        rows="3"
                        required
                      ></textarea>
                    </div>
                  </>
                )}
              </>
            )}

            <div className="profile-form-footer">
              <button type="button" className="btn btn-secondary" onClick={handleBack} disabled={step === 1}>
                Back
              </button>

              <button
                type="button"
                className={`btn btn-primary ${isLoading ? "loading" : ""}`}
                onClick={handleNext}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : step === totalSteps ? "Complete Profile" : "Next"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateProfilePage

