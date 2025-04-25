import google.generativeai as genai
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

genai.configure(api_key="AIzaSyDBxEyYzW8voQZb2We7dREhgQAccCyxrz8")

df = pd.read_csv("train.csv")

df['label'] = df['label'].map({0: 'REAL', 1: 'FAKE'})
df.dropna(subset=['text'], inplace=True)

vectorizer = TfidfVectorizer(max_features=5000)
X = vectorizer.fit_transform(df['text'])
y = df['label']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

ml_model = LogisticRegression()
ml_model.fit(X_train, y_train)

def classify_news_gemini(article_text):
    """Uses Gemini API to classify news as REAL or FAKE."""
    model = genai.GenerativeModel("gemini-1.5-flash")

    prompt = f"""
    Analyze the following news article and determine whether it is REAL or FAKE.
    If the article contains misinformation, misleading claims, or lacks credible sources, return 'FAKE'.
    Otherwise, return 'REAL'.

    News: {article_text}

    Response Format: 'REAL' or 'FAKE'
    """

    response = model.generate_content(prompt)
    return response.text.strip()

def hybrid_predict(article_text):
    gemini_prediction = classify_news_gemini(article_text)

    text_vectorized = vectorizer.transform([article_text])

    ml_prediction = ml_model.predict(text_vectorized)[0]

    if gemini_prediction in ['REAL', 'FAKE']:
        return gemini_prediction
    else:
        return ml_prediction

test_samples = df.sample(10)
test_samples['hybrid_prediction'] = test_samples['text'].apply(hybrid_predict)

hybrid_accuracy = accuracy_score(test_samples['label'], test_samples['hybrid_prediction'])
print(f"Hybrid Model Accuracy: {hybrid_accuracy:.2f}")

print(test_samples[['text', 'label', 'hybrid_prediction']])

article_text = "Indain Governement Reduced Taxes for middle class people"

prediction = hybrid_predict(article_text)

print(f"🔍 Hybrid Model Prediction: {prediction}")

