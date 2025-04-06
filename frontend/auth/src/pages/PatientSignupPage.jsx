"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "../styles/AuthPages.css";

function PatientSignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    dob: "",
    phoneNumber: "",
    gender: "male",
    age: "",
    medicalHistory: "",
    chronicConditions: "",
    severeAllergies: "",
    currentMedication: "",
    familyMedicalHistory: "",
    smokingHabits: "never",
    alcoholConsumption: "none",
    exerciseFrequency: "moderate",
    dietaryPreferences: "no-restrictions",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      // Sign up the user with Supabase Auth
      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        setError(authError.message);
        setIsLoading(false);
        return;
      }

      // Insert additional patient data into the "patients" table
      const { error: dbError } = await supabase.from("patients").insert({
        patient_id: data.user.id, // Use the Supabase Auth UID
        first_name: formData.firstName,
        last_name: formData.lastName,
        dob: formData.dob,
        phone_number: formData.phoneNumber,
        gender: formData.gender,
        age: formData.age,
        medical_history: formData.medicalHistory,
        chronic_conditions: formData.chronicConditions,
        severe_allergies: formData.severeAllergies,
        current_medication: formData.currentMedication,
        family_medical_history: formData.familyMedicalHistory,
        smoking_habits: formData.smokingHabits,
        alcohol_consumption: formData.alcoholConsumption,
        exercise_frequency: formData.exerciseFrequency,
        dietary_preferences: formData.dietaryPreferences,
        access_code: null, // Default value
        access_code_expiry: null, // Default value
      });

      if (dbError) {
        setError(dbError.message);
        setIsLoading(false);
        return;
      }

      // Navigate to the login page after successful signup
      navigate("/login/patient");
    } catch (err) {
      console.error("Error during signup:", err);
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
            <i className="fas fa-user"></i>
          </div>
          <h1>Patient Signup</h1>
          <p>Create an account to manage your health records</p>
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

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-control"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

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
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              className="form-control"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              className="form-control"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              className="form-control"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="medicalHistory">Medical History</label>
            <textarea
              id="medicalHistory"
              name="medicalHistory"
              className="form-control"
              value={formData.medicalHistory}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button
            type="submit"
            className={`btn btn-primary btn-block ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login/patient">Sign in</Link>
        </div>
      </div>
    </div>
  );
}

export default PatientSignupPage;