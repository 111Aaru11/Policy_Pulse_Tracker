import requests

def ask_gemini(prompt):   
    url = "http://localhost:11434/api/generate"

    data = {
        "model": "llama3",  
        "prompt": prompt,
        "stream": False
    }

    try:
        response = requests.post(url, json=data)
        result = response.json()
        return result.get("response", "No response from Ollama")
    except:
        return "⚠️ Ollama not running. Start it using 'ollama run llama3'"
# from openai import OpenAI
# import os
# from dotenv import load_dotenv

# load_dotenv()

# client = OpenAI(
#     base_url="https://openrouter.ai/api/v1",
#     api_key=os.getenv("OPENROUTER_API_KEY")   # ✅ FIXED
# )

# def ask_gemini(prompt):   # keep same name (no change in app.py)
#     response = client.chat.completions.create(
#         model="openai/gpt-3.5-turbo",
#         messages=[
#             {"role": "user", "content": prompt}
#         ]
#     )
#     return response.choices[0].message.content