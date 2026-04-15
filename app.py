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
        load_services()
        domain = request.args.get("domain")

        articles = fetch_news(domain)

        # Store in RAG
        texts = [a["title"] + " " + (a["description"] or "") for a in articles]
        rag.add_documents(texts)

        # Add sentiment
        enriched = []
        for t in texts:
            sentiment = analyze_sentiment(t)
            enriched.append({
                "text": t,
                "sentiment": sentiment
            })

        return jsonify(enriched)
    except Exception as e:
        return jsonify({"error": str(e), "type": type(e).__name__}), 500


@app.route("/api/chat", methods=["POST"])
def chat():
    try:
        load_services()
        data = request.json
        domain = data["domain"]
        year = data["year"]

        query = f"{domain} policies in India {year}"

        # 🔥 RAG retrieval
        context = rag.search(query)

        prompt = f"""
        You are an AI Policy Analyst.

        Context:
        {context}

        Question:
        List policies in {domain} for {year} in India.

        Answer in bullet points.
        """

        response = ask_gemini(prompt)

        return jsonify({"response": response})
    except Exception as e:
        return jsonify({"error": str(e), "type": type(e).__name__}), 500


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})



if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)