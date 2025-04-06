import { Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import CreateProfilePage from "./pages/CreateProfilePage"
import PatientDashboard from "./pages/PatientDashboard"
import DoctorDashboard from "./pages/DoctorDashboard"
import "./styles/App.css"

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/create-profile" element={<CreateProfilePage />} />
        <Route path="/dashboard/patient" element={<PatientDashboard />} />
        <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
      </Routes>
    </div>
  )
}

export default App

