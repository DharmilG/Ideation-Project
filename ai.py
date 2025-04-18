from flask import Flask, request, jsonify
import pandas as pd
import google.generativeai as genai
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split
from flask_cors import CORS
import re
import joblib
import os
import logging
import asyncio
import aiohttp
from sklearn.utils import resample

# Configure logging (minimal)
logging.basicConfig(filename='predictions.log', level=logging.INFO, format='%(asctime)s - %(message)s')

# Configure Gemini
genai.configure(api_key="AIzaSyDBxEyYzW8voQZb2We7dREhgQAccCyxrz8")

# Lightweight preprocessing function
def preprocess_text(text):
    if not isinstance(text, str):
        return ""
    text = text.lower()
    text = re.sub(r'[^\w\s]', '', text)
    tokens = text.split()
    stop_words = {'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were', 'will', 'with'}
    tokens = [t for t in tokens if t not in stop_words and len(t) > 2]
    return ' '.join(tokens)

# Load or train model
MODEL_PATH = 'rf_model.pkl'
VECTORIZER_PATH = 'tfidf_vectorizer.pkl'

def load_or_train_model():
    if os.path.exists(MODEL_PATH) and os.path.exists(VECTORIZER_PATH):
        vectorizer = joblib.load(VECTORIZER_PATH)
        ml_model = joblib.load(MODEL_PATH)
        print("Loaded cached model and vectorizer")
        return vectorizer, ml_model

    # Load and prepare dataset
    if not os.path.exists('train.csv'):
        raise FileNotFoundError("train.csv not found in the current directory")
    
    df = pd.read_csv("train.csv")
    df['label'] = df['label'].map({0: 'REAL', 1: 'FAKE'})
    df.dropna(subset=['text'], inplace=True)

    # Preprocess text data
    df['clean_text'] = df['text'].apply(preprocess_text)
    X = df['clean_text']
    y = df['label']

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Vectorize text
    vectorizer = TfidfVectorizer(max_features=5000)
    X_train_vec = vectorizer.fit_transform(X_train)
    X_test_vec = vectorizer.transform(X_test)

    # Train RandomForest model
    model = RandomForestClassifier(n_estimators=100)
    model.fit(X_train_vec, y_train)

    # Evaluate model
    y_pred = model.predict(X_test_vec)
    print(classification_report(y_test, y_pred))

    # Save model and vectorizer
    joblib.dump(vectorizer, VECTORIZER_PATH)
    joblib.dump(model, MODEL_PATH)
    return vectorizer, model

vectorizer, ml_model = load_or_train_model()

# Flask app setup
app = Flask(__name__)
CORS(app)

# Prediction route
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    # Preprocess and vectorize input text
    processed_text = preprocess_text(text)
    vectorized_text = vectorizer.transform([processed_text])

    # Make prediction
    prediction = ml_model.predict(vectorized_text)
    confidence = ml_model.predict_proba(vectorized_text)

    response = {
        "prediction": prediction[0],
        "confidence": {
            "real": confidence[0][0],
            "fake": confidence[0][1],
        }
    }
    return jsonify(response)

# Feedback route
@app.route("/feedback", methods=["POST"])
def feedback():
    data = request.get_json()
    text = data.get("text", "")
    user_label = data.get("label", "").upper()

    if not text or user_label not in ["REAL", "FAKE"]:
        return jsonify({"error": "Invalid feedback"}), 400

    try:
        with open("feedback.csv", "a", encoding="utf-8") as f:
            f.write(f'"{text.replace(chr(34), "")}",{user_label}\n')  # remove double quotes in text

        return jsonify({"message": "Feedback recorded successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Scraping route (stub for scraping viral news)
@app.route("/scrape-news", methods=["GET"])
async def scrape_news():
    # Stub: You would implement real news scraping here, e.g., using `aiohttp`
    news_items = [
        {"title": "Example News Title 1", "image": "", "video": ""},
        {"title": "Example News Title 2", "image": "", "video": ""},
        {"title": "Example News Title 3", "image": "", "video": ""}
    ]
    return jsonify(news_items)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
