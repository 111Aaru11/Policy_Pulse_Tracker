from flask import Flask, render_template, request, jsonify
from services.news_service import fetch_news
from services.rag_service import rag
from services.llm_service import ask_gemini
from services.nlp_service import analyze_sentiment

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/news", methods=["GET"])
def get_news():
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


@app.route("/chat", methods=["POST"])
def chat():
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


if __name__ == "__main__":
    app.run(debug=True)