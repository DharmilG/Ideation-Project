from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS
import re
import logging
import os
import json

# Configure Gemini using an environment variable or directly
genai.configure(api_key="AIzaSyDBxEyYzW8voQZb2We7dREhgQAccCyxrz8")

# Load Gemini model with deterministic settings
model = genai.GenerativeModel(
    model_name="gemini-2.0-pro-exp-02-05"
)

# Text preprocessing
def preprocess_text(text):
    if not isinstance(text, str):
        return ""
    text = text.lower()
    text = re.sub(r'[^\w\s]', '', text)
    return text.strip()

# Build prompt
def build_prompt(text):
    return f"""
You are a strict fact-checking AI. Analyze the following news article or headline and determine if it is factually correct.

\"{text}\"

Reply ONLY with a valid JSON object in the following format (no extra explanations):

{{
  "verdict": "REAL" or "FAKE",
  "probability_correct": float between 0.0 and 1.0  // This is the probability that the news is TRUE/correct.
}}
"""

# Flask app setup
app = Flask(__name__)
CORS(app)  # Replace "*" with specific domains for better security.

# /predict endpoint
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        text = data.get("text", "")

        if not text:
            return jsonify({"error": "No text provided"}), 400

        processed_text = preprocess_text(text)
        prompt = build_prompt(processed_text)

        # Set temperature to 0 for deterministic outputs
        response = model.generate_content(
            prompt,
            generation_config={"temperature": 0.0}
        )
        raw_output = response.text.strip()
        
        print("Gemini response:", raw_output)  # For debugging

        # Extract only the JSON part using regex
        json_match = re.search(r'{.*}', raw_output, re.DOTALL)
        if not json_match:
            return jsonify({"error": "Unable to extract JSON", "raw_output": raw_output}), 500

        try:
            result = json.loads(json_match.group())
        except json.JSONDecodeError:
            return jsonify({"error": "Invalid JSON format from AI", "raw_output": raw_output}), 500

        if "verdict" not in result or "probability_correct" not in result:
            return jsonify({"error": "Incomplete response from AI", "raw_output": raw_output}), 500

        probability_correct = float(result["probability_correct"])
        probability_percent = round(probability_correct * 100, 2)

        return jsonify({
            "verdict": result["verdict"],
            "probability_correct": probability_correct,
            "probability_percent": probability_percent
        })

    except Exception as e:
        logging.error(f"Error in /predict: {str(e)}")
        return jsonify({"error": str(e)}), 500

# Run app
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)  # Set debug=False for production