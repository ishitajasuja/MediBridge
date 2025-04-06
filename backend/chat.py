from flask import Flask, request, jsonify
from supabase import create_client
from groq import Groq
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Supabase credentials
SUPABASE_URL = "https://kzovbnxjiifsogvzimgv.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6b3ZibnhqaWlmc29ndnppbWd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3ODYzODAsImV4cCI6MjA1OTM2MjM4MH0.UCFx5noiijrYSr7w98YgaDB054b6njdFYqzbF8vEE8A"

# Groq credentials
GROQ_API_KEY = "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"
GROQ_MODEL = "llama3-70b-8192"

# Initialize Supabase and Groq clients
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
groq_client = Groq(api_key=GROQ_API_KEY)

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        patient_id = data.get('patient_id')
        session_id = data.get('session_id')
        question = data.get('question')

        if not all([patient_id, session_id, question]):
            return jsonify({"error": "Missing patient_id, session_id, or question"}), 400

        # Fetch reports for this session
        reports_response = supabase.table("reports").select("summary").eq("session_id", session_id).execute()
        report_summaries = [r["summary"] for r in reports_response.data if r.get("summary")]

        # Fetch prescriptions for this session
        prescriptions_response = supabase.table("prescriptions").select("notes").eq("session_id", session_id).execute()
        prescription_notes = [p["notes"] for p in prescriptions_response.data if p.get("notes")]

        if not report_summaries and not prescription_notes:
            return jsonify({"error": "No data found for the session"}), 404

        # Combine context
        knowledge_base = "\n\n".join(report_summaries + prescription_notes)

        # Format input for Groq
        chat_input = f"""Based on the following medical session info, answer the user's question in a descriptive but factual tone.

        Medical Session Info:
        {knowledge_base}

        User Question:
        {question}
        """

        response = groq_client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[
                {"role": "system", "content": "You are a medical session assistant. Stick to the facts based on the provided data."},
                {"role": "user", "content": chat_input}
            ]
        )

        answer = response.choices[0].message.content
        return jsonify({"response": answer})

    except Exception as e:
        print(f"Error in /chat endpoint: {str(e)}")  # Log the error
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(port=4002,debug=True)
