"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import "../styles/Dashboard.css";
import axios from "axios";

function PatientDashboard() {
  const [accessRequests, setAccessRequests] = useState([]);
  const [sidebarActive, setSidebarActive] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  // Fetch access requests for the logged-in patient
  const fetchAccessRequests = async () => {
    try {
      const patientDetails = JSON.parse(localStorage.getItem("patientDetails"));

      if (!patientDetails || !patientDetails.patient_id) {
        console.error("Patient ID not found in localStorage.");
        return;
      }

      const patientId = patientDetails.patient_id;

      const response = await fetch(`http://localhost:5000/api/access-requests?patient_id=${patientId}`);
      const data = await response.json();
      setAccessRequests(data);
    } catch (error) {
      console.error("Error fetching access requests:", error);
    }
  };

  // Handle chatbot message submission
  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    const patientDetails = JSON.parse(localStorage.getItem("patientDetails"));
    const sessionId = "session_123"; // Replace with actual session ID

    const newMessage = { sender: "user", text: userMessage };
    setChatMessages((prev) => [...prev, newMessage]);
    setUserMessage("");

    try {
      const response = await axios.post("http://localhost:4002/chat", {
        patient_id: patientDetails.patient_id,
        session_id: sessionId,
        question: userMessage,
      });

      const botMessage = { sender: "bot", text: response.data.response };
      setChatMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error communicating with chatbot:", error);
      const errorMessage = { sender: "bot", text: "Sorry, I couldn't process your request. Please try again later." };
      setChatMessages((prev) => [...prev, errorMessage]);
    }
  };

  useEffect(() => {
    fetchAccessRequests();
  }, []);

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

          {/* Access Requests Section */}
          <div className="dashboard-card">
            <div className="card-header">
              <h2>Access Requests</h2>
              <p>Manage requests from doctors to access your medical records</p>
            </div>

            <div className="card-content">
              {accessRequests.length > 0 ? (
                accessRequests.map((request) => (
                  <div key={request.request_id} className="list-item">
                    <div className="list-item-content">
                      <h3>Doctor: {request.doctors?.name || "Unknown"}</h3>
                      <p>Status: {request.request_status}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No access requests at the moment.</p>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Chatbot Button */}
      <button className="chatbot-btn" onClick={() => setChatbotOpen(!chatbotOpen)}>
        <i className="fas fa-comments"></i>
      </button>

      {/* Chatbot Modal */}
      {chatbotOpen && (
        <div className="chatbot-modal">
          <div className="chatbot-header">
            <h3>Chat with MediConnect</h3>
            <button className="close-btn" onClick={() => setChatbotOpen(false)}>
              &times;
            </button>
          </div>
          <div className="chatbot-body">
            <div className="chat-messages">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`chat-message ${message.sender === "user" ? "user-message" : "bot-message"}`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientDashboard;