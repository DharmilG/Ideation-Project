import google.generativeai as genai

genai.configure(api_key="AIzaSyDBxEyYzW8voQZb2We7dREhgQAccCyxrz8")

models = genai.list_models()

for model in models:
    print(f"Name: {model.name}")
