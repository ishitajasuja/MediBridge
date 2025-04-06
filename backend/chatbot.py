from flask import Flask, request, jsonify
from supabase import create_client
from groq import Groq
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Supabase credentials
SUPABASE_URL = "https://kzovbnxjiifsogvzimgv.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6b3ZibnhqaWlmc29ndnppbWd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3ODYzODAsImV4cCI6MjA1OTM2MjM4MH0.UCFx5noiijrYSr7w98YgaDB054b6njdFYqzbF8vEE8A"

# Groq credentials
GROQ_API_KEY = "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"
GROQ_MODEL = "llama3-70b-8192"

# Initialize Supabase and Groq clients
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
groq_client = Groq(api_key=GROQ_API_KEY)

# 🔒 Hardcoded for now — replace with dynamic Supabase Auth later
PATIENT_ID = "4225c3a7-9b12-4535-b619-f8f894b787c6"

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    question = data.get('question')
    patient_id = data.get('patient_id')  # Get patient_id from the request

    if not question:
        return jsonify({"error": "Missing question"}), 400

    if not patient_id:
        return jsonify({"error": "Missing patient_id"}), 400

    # 🔄 1. Fetch all sessions
    sessions_response = supabase.table("sessions").select("session_id").eq("patient_id", patient_id).execute()
    session_ids = [s["session_id"] for s in sessions_response.data]

    if not session_ids:
        return jsonify({"error": "No sessions found for this patient"}), 404

    # 📑 2. Fetch all reports and prescriptions
    reports_response = supabase.table("reports").select("summary").in_("session_id", session_ids).execute()
    prescriptions_response = supabase.table("prescriptions").select("notes").in_("session_id", session_ids).execute()

    report_summaries = [r["summary"] for r in reports_response.data if r.get("summary")]
    prescription_notes = [p["notes"] for p in prescriptions_response.data if p.get("notes")]

    if not report_summaries and not prescription_notes:
        return jsonify({"error": "No medical data found for the patient"}), 404

    # 👤 3. Fetch patient personal details
    patient_response = supabase.table("patients").select("*").eq("patient_id", patient_id).execute()

    if not patient_response.data:
        return jsonify({"error": "Patient not found"}), 404

    patient = patient_response.data[0]

    # 🧾 4. Format patient info
    patient_info = f"""Patient Profile:
Name: {patient.get('first_name', '')} {patient.get('last_name', '')}
Age: {patient.get('age', 'N/A')} | Gender: {patient.get('gender', 'N/A')}
DOB: {patient.get('dob', 'N/A')} | Phone: {patient.get('phone_number', 'N/A')}
Weight: {patient.get('weight_kg', 'N/A')} kg
Chronic Conditions: {patient.get('chronic_conditions', 'None')}
Severe Allergies: {patient.get('severe_allergies', 'None')}
Current Medication: {patient.get('current_medication', 'None')}
Family History: {patient.get('family_medical_history', 'None')}
Lifestyle:
- Smoking: {patient.get('smoking_habits', 'Unknown')}
- Alcohol: {patient.get('alcohol_consumption', 'Unknown')}
- Exercise: {patient.get('exercise_frequency', 'Unknown')}
- Diet: {patient.get('dietary_preferences', 'Unknown')}
Medical History: {patient.get('medical_history', 'Not available')}
"""

    # 📚 5. Build knowledge base
    session_data = "\n\n".join(report_summaries + prescription_notes)
    knowledge_base = f"{patient_info}\n\nMedical Session Info:\n{session_data}"

    chat_input = f"""Based on the following patient profile and medical session info, answer the user's question in a descriptive but factual tone.

{knowledge_base}

User Question:
{question}
"""

    try:
        response = groq_client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[
                {"role": "system", "content": "You are a medical assistant. Answer using only the given patient information and medical data."},
                {"role": "user", "content": chat_input}
            ]
        )

        answer = response.choices[0].message.content
        return jsonify({"response": answer})

    except Exception as e:
        return jsonify({"error": f"Groq API error: {str(e)}"}), 500
    

if __name__ == '__main__':
    app.run(port=4002,debug=True)