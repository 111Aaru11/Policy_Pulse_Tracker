from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS"], "allow_headers": ["Content-Type"]}})

# Lazy-load services to prevent startup timeout
fetch_news = None
rag = None
ask_gemini = None
analyze_sentiment = None

def load_services():
    global fetch_news, rag, ask_gemini, analyze_sentiment
    if fetch_news is None:
        from services.news_service import fetch_news as fn
        from services.rag_service import rag as r
        from services.llm_service import ask_gemini as ag
        from services.nlp_service import analyze_sentiment as as_
        fetch_news = fn
        rag = r
        ask_gemini = ag
        analyze_sentiment = as_

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/news", methods=["GET"])
def get_news():
    try:
        domain = request.args.get("domain")
        
        # Fetch news without heavy ML processing
        from services.news_service import fetch_news
        articles = fetch_news(domain)
        
        # Return articles as-is without sentiment analysis
        simplified = []
        for a in articles:
            simplified.append({
                "title": a.get("title"),
                "description": a.get("description"),
                "source": "News",
                "sentiment": [[{"label": "NEUTRAL", "score": 0.5}]]
            })
        
        return jsonify(simplified)
    except Exception as e:
        return jsonify({"error": str(e), "type": type(e).__name__}), 500


@app.route("/api/chat", methods=["POST"])
def chat():
    try:
        data = request.json
        domain = data.get("domain", "Health")
        year = data.get("year", 2026)
        query = data.get("query", "")
        
        # Return a helpful response without heavy processing
        response_text = f"I'm your AI Policy Assistant for {domain}. You asked about {query} in {year}. Let me help you find relevant policies and reforms in this domain."
        
        return jsonify({"response": response_text})
    except Exception as e:
        return jsonify({"error": str(e), "type": type(e).__name__}), 500


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})



if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)