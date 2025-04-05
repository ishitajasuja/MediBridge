import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AuthPage from "./components/AuthPage"
import ForgotPasswordPage from "./components/ForgotPasswordPage"
import ResetPasswordPage from "./components/ResetPasswordPage"
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </Router>
  )
}

export default App

