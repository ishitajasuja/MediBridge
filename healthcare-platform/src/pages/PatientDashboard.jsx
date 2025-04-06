"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import DashboardHeader from "../components/DashboardHeader"
import Chatbot from "../components/Chatbot"
import "../styles/Dashboard.css"

function PatientDashboard() {
  const [sidebarActive, setSidebarActive] = useState(false)
  const [chatbotOpen, setChatbotOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive)
  }

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "Today",
      time: "3:00 PM",
      image: "",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Dermatologist",
      date: "Tomorrow",
      time: "10:30 AM",
      image: "",
    },
  ]

  const recentPrescriptions = [
    {
      id: 1,
      name: "Amoxicillin",
      dosage: "500mg",
      frequency: "3 times daily",
      doctor: "Dr. Sarah Johnson",
      date: "May 15, 2025",
    },
    {
      id: 2,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      doctor: "Dr. Sarah Johnson",
      date: "May 10, 2025",
    },
    {
      id: 3,
      name: "Ibuprofen",
      dosage: "400mg",
      frequency: "As needed",
      doctor: "Dr. Michael Chen",
      date: "May 5, 2025",
    },
  ]

  const recentReports = [
    {
      id: 1,
      name: "Blood Test Results",
      doctor: "Dr. Sarah Johnson",
      date: "May 12, 2025",
      status: "normal",
    },
    {
      id: 2,
      name: "Chest X-Ray",
      doctor: "Dr. Robert Williams",
      date: "May 8, 2025",
      status: "review",
    },
  ]

  return (
    <div className="dashboard-container">
      <Sidebar userType="patient" className={sidebarActive ? "active" : ""} />

      <div className="dashboard-content">
        <DashboardHeader userType="patient" toggleSidebar={toggleSidebar} />

        <main className="main-content">
          <div className="page-header">
            <h1>Patient Dashboard</h1>
            <button className="btn btn-primary">
              <i className="fas fa-plus"></i> Book Appointment
            </button>
          </div>

          <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-card-header">
                <h3>Upcoming Appointments</h3>
                <i className="fas fa-calendar-alt"></i>
              </div>
              <div className="stat-card-value">{upcomingAppointments.length}</div>
              <div className="stat-card-info">Next: Today at 3:00 PM</div>
            </div>

            <div className="stat-card">
              <div className="stat-card-header">
                <h3>Active Prescriptions</h3>
                <i className="fas fa-prescription-bottle-alt"></i>
              </div>
              <div className="stat-card-value">{recentPrescriptions.length}</div>
              <div className="stat-card-info">Last updated: May 15, 2025</div>
            </div>

            <div className="stat-card">
              <div className="stat-card-header">
                <h3>Medical Reports</h3>
                <i className="fas fa-file-medical"></i>
              </div>
              <div className="stat-card-value">{recentReports.length}</div>
              <div className="stat-card-info">Last updated: May 12, 2025</div>
            </div>

            <div className="stat-card">
              <div className="stat-card-header">
                <h3>Health Score</h3>
                <i className="fas fa-heartbeat"></i>
              </div>
              <div className="stat-card-value">85%</div>
              <div className="stat-card-progress">
                <div className="progress-bar" style={{ width: "85%" }}></div>
              </div>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-card large-card">
              <div className="card-header">
                <h2>Recent Prescriptions</h2>
                <p>Your most recent medication prescriptions</p>
              </div>

              <div className="card-content">
                {recentPrescriptions.map((prescription) => (
                  <div key={prescription.id} className="list-item">
                    <div className="list-item-icon">
                      <i className="fas fa-prescription-bottle-alt"></i>
                    </div>
                    <div className="list-item-content">
                      <h3>{prescription.name}</h3>
                      <p>
                        {prescription.dosage} - {prescription.frequency}
                      </p>
                      <span className="list-item-meta">
                        Prescribed by {prescription.doctor} on {prescription.date}
                      </span>
                    </div>
                    <button className="list-item-action">
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                ))}
              </div>

              <div className="card-footer">
                <Link to="/dashboard/patient/prescriptions" className="btn btn-secondary btn-block">
                  View All Prescriptions <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <h2>Upcoming Appointments</h2>
                <p>Your scheduled appointments</p>
              </div>

              <div className="card-content">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="list-item">
                    <div className="list-item-avatar">
                      {appointment.image ? (
                        <img src={appointment.image || "/placeholder.svg"} alt={appointment.doctor} />
                      ) : (
                        <div className="avatar-placeholder">
                          {appointment.doctor
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      )}
                    </div>
                    <div className="list-item-content">
                      <h3>{appointment.doctor}</h3>
                      <p>{appointment.specialty}</p>
                      <div className="appointment-time">
                        <span className="appointment-date">{appointment.date}</span>
                        <span className="appointment-hour">
                          <i className="fas fa-clock"></i> {appointment.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card-footer">
                <Link to="/dashboard/patient/appointments" className="btn btn-secondary btn-block">
                  View All Appointments <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <h2>Recent Medical Reports</h2>
                <p>Your latest medical test results and reports</p>
              </div>

              <div className="card-content">
                {recentReports.map((report) => (
                  <div key={report.id} className="list-item">
                    <div className="list-item-icon">
                      <i className="fas fa-file-medical"></i>
                    </div>
                    <div className="list-item-content">
                      <h3>{report.name}</h3>
                      <p>{report.doctor}</p>
                      <div className="report-meta">
                        <span className="report-date">{report.date}</span>
                        <span className={`report-status ${report.status}`}>
                          {report.status === "normal" ? "Normal" : "Needs Review"}
                        </span>
                      </div>
                    </div>
                    <button className="list-item-action">
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                ))}
              </div>

              <div className="card-footer">
                <Link to="/dashboard/patient/reports" className="btn btn-secondary btn-block">
                  View All Reports <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <h2>Health Insights</h2>
                <p>AI-powered insights based on your medical data</p>
              </div>

              <div className="card-content">
                <div className="tabs">
                  <div className="tab-header">
                    <button className="tab-btn active">Medications</button>
                    <button className="tab-btn">Reports</button>
                  </div>

                  <div className="tab-content">
                    <div className="insight-item">
                      <h3>
                        <i className="fas fa-prescription-bottle-alt"></i>
                        Amoxicillin Insights
                      </h3>
                      <p>Take with food to reduce stomach upset. Complete the full course even if you feel better.</p>
                      <a href="#" className="insight-link">
                        Learn more about this medication
                      </a>
                    </div>

                    <div className="insight-item">
                      <h3>
                        <i className="fas fa-prescription-bottle-alt"></i>
                        Lisinopril Insights
                      </h3>
                      <p>Take at the same time each day. May cause dizziness when standing up quickly.</p>
                      <a href="#" className="insight-link">
                        Learn more about this medication
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <button className="btn btn-primary btn-block" onClick={() => setChatbotOpen(true)}>
                  <i className="fas fa-comment-medical"></i> Ask Health Assistant
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Chatbot Button */}
      <button className="chatbot-btn pulse-animation" onClick={() => setChatbotOpen(!chatbotOpen)}>
        <i className="fas fa-comment-medical"></i>
      </button>

      {/* Chatbot Component */}
      <Chatbot isOpen={chatbotOpen} onClose={() => setChatbotOpen(false)} />
    </div>
  )
}

export default PatientDashboard

