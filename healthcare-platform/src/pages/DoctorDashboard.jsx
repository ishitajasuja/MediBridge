"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import DashboardHeader from "../components/DashboardHeader"
import "../styles/Dashboard.css"

function DoctorDashboard() {
  const [sidebarActive, setSidebarActive] = useState(false)

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive)
  }

  const upcomingAppointments = [
    {
      id: 1,
      patient: "John Doe",
      age: 45,
      reason: "Follow-up",
      date: "Today",
      time: "3:00 PM",
      image: "",
    },
    {
      id: 2,
      patient: "Jane Smith",
      age: 32,
      reason: "Consultation",
      date: "Today",
      time: "4:30 PM",
      image: "",
    },
    {
      id: 3,
      patient: "Robert Johnson",
      age: 58,
      reason: "Test Results",
      date: "Tomorrow",
      time: "10:00 AM",
      image: "",
    },
  ]

  const recentPatients = [
    {
      id: 1,
      name: "John Doe",
      age: 45,
      lastVisit: "May 10, 2025",
      condition: "Hypertension",
      image: "",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 32,
      lastVisit: "May 8, 2025",
      condition: "Diabetes",
      image: "",
    },
    {
      id: 3,
      name: "Robert Johnson",
      age: 58,
      lastVisit: "May 5, 2025",
      condition: "Arthritis",
      image: "",
    },
    {
      id: 4,
      name: "Emily Davis",
      age: 29,
      lastVisit: "May 1, 2025",
      condition: "Asthma",
      image: "",
    },
  ]

  const pendingReports = [
    {
      id: 1,
      patient: "John Doe",
      type: "Blood Test",
      date: "May 12, 2025",
      status: "pending",
    },
    {
      id: 2,
      patient: "Jane Smith",
      type: "MRI Scan",
      date: "May 11, 2025",
      status: "pending",
    },
  ]

  return (
    <div className="dashboard-container">
      <Sidebar userType="doctor" className={sidebarActive ? "active" : ""} />

      <div className="dashboard-content">
        <DashboardHeader userType="doctor" toggleSidebar={toggleSidebar} />

        <main className="main-content">
          <div className="page-header">
            <h1>Doctor Dashboard</h1>
            <div className="header-buttons">
              <button className="btn btn-secondary">
                <i className="fas fa-calendar-alt"></i> Schedule
              </button>
              <button className="btn btn-primary">
                <i className="fas fa-plus"></i> New Patient
              </button>
            </div>
          </div>

          <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-card-header">
                <h3>Today's Appointments</h3>
                <i className="fas fa-calendar-alt"></i>
              </div>
              <div className="stat-card-value">{upcomingAppointments.filter((a) => a.date === "Today").length}</div>
              <div className="stat-card-info">Next: Today at 3:00 PM</div>
            </div>

            <div className="stat-card">
              <div className="stat-card-header">
                <h3>Total Patients</h3>
                <i className="fas fa-users"></i>
              </div>
              <div className="stat-card-value">248</div>
              <div className="stat-card-info">+12 this month</div>
            </div>

            <div className="stat-card">
              <div className="stat-card-header">
                <h3>Pending Reports</h3>
                <i className="fas fa-file-medical"></i>
              </div>
              <div className="stat-card-value">{pendingReports.length}</div>
              <div className="stat-card-info">Requires your review</div>
            </div>

            <div className="stat-card">
              <div className="stat-card-header">
                <h3>Patient Satisfaction</h3>
                <i className="fas fa-heartbeat"></i>
              </div>
              <div className="stat-card-value">92%</div>
              <div className="stat-card-progress">
                <div className="progress-bar" style={{ width: "92%" }}></div>
              </div>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-card">
              <div className="card-header">
                <h2>Upcoming Appointments</h2>
                <p>Your scheduled appointments for today and tomorrow</p>
              </div>

              <div className="card-content">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="list-item">
                    <div className="list-item-avatar">
                      {appointment.image ? (
                        <img src={appointment.image || "/placeholder.svg"} alt={appointment.patient} />
                      ) : (
                        <div className="avatar-placeholder">
                          {appointment.patient
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      )}
                    </div>
                    <div className="list-item-content">
                      <h3>{appointment.patient}</h3>
                      <p>
                        {appointment.age} years • {appointment.reason}
                      </p>
                      <div className="appointment-time">
                        <span className="appointment-date">{appointment.date}</span>
                        <span className="appointment-hour">
                          <i className="fas fa-clock"></i> {appointment.time}
                        </span>
                      </div>
                    </div>
                    <button className="btn btn-sm btn-secondary">View</button>
                  </div>
                ))}
              </div>

              <div className="card-footer">
                <Link to="/dashboard/doctor/appointments" className="btn btn-secondary btn-block">
                  View All Appointments <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <h2>Patient Search</h2>
                <p>Quickly find and access patient records</p>
              </div>

              <div className="card-content">
                <div className="search-container">
                  <i className="fas fa-search"></i>
                  <input type="text" placeholder="Search patients by name or ID..." />
                </div>

                <div className="recent-patients">
                  <h3>Recent Patients</h3>

                  {recentPatients.map((patient) => (
                    <div key={patient.id} className="list-item">
                      <div className="list-item-avatar">
                        {patient.image ? (
                          <img src={patient.image || "/placeholder.svg"} alt={patient.name} />
                        ) : (
                          <div className="avatar-placeholder">
                            {patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                        )}
                      </div>
                      <div className="list-item-content">
                        <h3>{patient.name}</h3>
                        <p>
                          {patient.age} years • {patient.condition}
                        </p>
                      </div>
                      <button className="list-item-action">
                        <i className="fas fa-chevron-right"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-footer">
                <Link to="/dashboard/doctor/patients" className="btn btn-secondary btn-block">
                  View All Patients <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <h2>Pending Reports</h2>
                <p>Medical reports awaiting your review</p>
              </div>

              <div className="card-content">
                {pendingReports.map((report) => (
                  <div key={report.id} className="list-item">
                    <div className="list-item-icon">
                      <i className="fas fa-file-medical"></i>
                    </div>
                    <div className="list-item-content">
                      <h3>{report.type}</h3>
                      <p>{report.patient}</p>
                      <div className="report-meta">
                        <span className="report-date">{report.date}</span>
                        <span className="report-status review">Pending Review</span>
                      </div>
                    </div>
                    <button className="btn btn-sm btn-secondary">Review</button>
                  </div>
                ))}
              </div>

              <div className="card-footer">
                <Link to="/dashboard/doctor/reports" className="btn btn-secondary btn-block">
                  View All Reports <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <h2>Analytics Overview</h2>
                <p>Patient statistics and practice metrics</p>
              </div>

              <div className="card-content">
                <div className="tabs">
                  <div className="tab-header">
                    <button className="tab-btn active">Patients</button>
                    <button className="tab-btn">Appointments</button>
                  </div>

                  <div className="tab-content">
                    <div className="analytics-item">
                      <div className="analytics-header">
                        <h3>New Patients</h3>
                        <span className="analytics-trend positive">+12%</span>
                      </div>
                      <div className="analytics-progress">
                        <div className="progress-bar" style={{ width: "68%" }}></div>
                      </div>
                      <p className="analytics-info">12 new patients this month vs. 9 last month</p>
                    </div>

                    <div className="analytics-item">
                      <h3>Patient Age Distribution</h3>
                      <div className="age-distribution">
                        <div className="age-group">
                          <div className="age-bar-container">
                            <div className="age-bar" style={{ height: "40%" }}></div>
                          </div>
                          <span>0-18</span>
                        </div>
                        <div className="age-group">
                          <div className="age-bar-container">
                            <div className="age-bar" style={{ height: "60%" }}></div>
                          </div>
                          <span>19-35</span>
                        </div>
                        <div className="age-group">
                          <div className="age-bar-container">
                            <div className="age-bar" style={{ height: "80%" }}></div>
                          </div>
                          <span>36-55</span>
                        </div>
                        <div className="age-group">
                          <div className="age-bar-container">
                            <div className="age-bar" style={{ height: "50%" }}></div>
                          </div>
                          <span>56+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <Link to="/dashboard/doctor/analytics" className="btn btn-primary btn-block">
                  <i className="fas fa-chart-bar"></i> View Detailed Analytics
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DoctorDashboard

