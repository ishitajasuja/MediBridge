import { useState } from "react";
import axios from "axios";
import "../styles/Sidebar.css";

function FullScreenComponent() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prescriptions, setPrescriptions] = useState([{ medicine: "", dosage: "", instructions: "", refills: "" }]);
  const [summary, setSummary] = useState([]);
  const [explanation, setExplanation] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAddPrescription = () => {
    setPrescriptions([...prescriptions, { medicine: "", dosage: "", instructions: "", refills: "" }]);
  };

  const handlePrescriptionChange = (index, field, value) => {
    const updatedPrescriptions = [...prescriptions];
    updatedPrescriptions[index][field] = value;
    setPrescriptions(updatedPrescriptions);
  };

  const handleGetInfo = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/medicine-info", {
        medicines: prescriptions.map((p) => ({
          name: p.medicine,
          dosage: p.dosage,
          instructions: p.instructions,
          refills: p.refills,
        })),
      });
      setSummary(response.data);
    } catch (error) {
      console.error("Error fetching medicine info:", error);
    }
  };

  const handleKnowWhyPrescribed = async (medicineName) => {
    try {
      const response = await axios.post("http://localhost:4000/api/explain-medicine", {
        medicineName,
        patientSummary: summary,
      });
      setExplanation(response.data.explanation);
    } catch (error) {
      console.error("Error fetching explanation:", error);
    }
  };

  const handleUploadReport = async () => {
    if (!selectedFile) return alert("Please upload a PDF file.");
    const formData = new FormData();
    formData.append("pdf", selectedFile);

    try {
      const response = await axios.post("http://localhost:4000/api/parse-pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error uploading report:", error);
    }
  };

  return (
    <div className="fullscreen-container">
      <header className="header">
        <h1>MediConnect</h1>
      </header>

      <main className="content">
        <section className="upload-section">
          <h2>Upload Patient Report</h2>
          <input type="file" accept=".pdf" onChange={handleFileChange} />
          <button onClick={handleUploadReport}>Upload & Summarize</button>
        </section>

        <section className="prescriptions-section">
          <h2>Prescriptions</h2>
          {prescriptions.map((prescription, index) => (
            <div key={index} className="prescription-item">
              <input
                type="text"
                placeholder="Medicine Name"
                value={prescription.medicine}
                onChange={(e) => handlePrescriptionChange(index, "medicine", e.target.value)}
              />
              <input
                type="text"
                placeholder="Dosage"
                value={prescription.dosage}
                onChange={(e) => handlePrescriptionChange(index, "dosage", e.target.value)}
              />
              <input
                type="text"
                placeholder="Instructions"
                value={prescription.instructions}
                onChange={(e) => handlePrescriptionChange(index, "instructions", e.target.value)}
              />
              <input
                type="text"
                placeholder="Refills"
                value={prescription.refills}
                onChange={(e) => handlePrescriptionChange(index, "refills", e.target.value)}
              />
              <button onClick={() => handleKnowWhyPrescribed(prescription.medicine)}>Why Prescribed?</button>
            </div>
          ))}
          <button onClick={handleAddPrescription}>Add Prescription</button>
          <button onClick={handleGetInfo}>Get Info</button>
        </section>

        <section className="summary-section">
          <h2>Summary</h2>
          {Array.isArray(summary) && summary.length > 0 ? (
            summary.map((item, index) => (
              <div key={index} className="summary-item">
                <p><strong>Medicine:</strong> {item.name}</p>
                <p><strong>Dosage:</strong> {item.dosage}</p>
                <p><strong>Instructions:</strong> {item.instructions}</p>
                <p><strong>Refills:</strong> {item.refills}</p>
                <p><strong>Source:</strong> {item.source}</p>
                <p><strong>Summary:</strong> {item.summary}</p>
              </div>
            ))
          ) : (
            <p>No summary available.</p>
          )}
        </section>

        <section className="explanation-section">
          <h2>Explanation</h2>
          <p>{explanation || "No explanation available."}</p>
        </section>
      </main>
    </div>
  );
}

export default FullScreenComponent;