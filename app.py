from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import requests

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS"], "allow_headers": ["Content-Type"]}})

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/news", methods=["GET"])
def get_news():
    try:
        domain = request.args.get("domain", "Health")
        
        # Fetch real news from GNews API
        api_key = os.getenv("GNEWS_API_KEY")
        if not api_key:
            raise ValueError("GNEWS_API_KEY not set")
        
        url = f"https://gnews.io/api/v4/search?q={domain}%20policy&lang=en&country=in&max=5&apikey={api_key}"
        response = requests.get(url, timeout=5)
        data = response.json()
        
        articles = []
        for article in data.get("articles", []):
            articles.append({
                "title": article.get("title"),
                "description": article.get("description"),
                "source": article.get("source", {}).get("name", "News"),
                "sentiment": [[{"label": "NEUTRAL", "score": 0.5}]]
            })
        
        return jsonify(articles)
    except Exception as e:
        # Fallback mock data on error
        return jsonify([
            {
                "title": f"{request.args.get('domain', 'Health')} Policy Update 2026",
                "description": f"Latest updates and reforms in {request.args.get('domain', 'Health')} sector",
                "source": "Policy Pulse AI",
                "sentiment": [[{"label": "NEUTRAL", "score": 0.5}]]
            },
            {
                "title": f"{request.args.get('domain', 'Health')} Initiative Launched",
                "description": f"New government initiative to improve {request.args.get('domain', 'Health')} services",
                "source": "Policy Pulse AI",
                "sentiment": [[{"label": "NEUTRAL", "score": 0.5}]]
            }
        ])

@app.route("/api/chat", methods=["POST"])
def chat():
    try:
        data = request.json or {}
        domain = str(data.get("domain", "Health"))
        year = int(data.get("year", 2026))
        query = str(data.get("query", ""))
        
        # Return helpful response
        response_text = f"I'm your AI Policy Assistant for {domain}. You asked: '{query}' for {year}. Based on current policy information, I can help you understand key initiatives, reforms, and government programs in the {domain} sector."
        
        result = {"response": str(response_text)}
        return jsonify(result)
    except Exception as e:
        error_response = {"response": "I'm your AI Policy Assistant. How can I help you with government policies?"}
        return jsonify(error_response), 200

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)