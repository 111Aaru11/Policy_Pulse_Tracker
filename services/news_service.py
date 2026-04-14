import requests
from config import GNEWS_API_KEY

def fetch_news(domain):
    url = f"https://gnews.io/api/v4/search?q={domain}%20policy&lang=en&country=in&max=5&apikey={GNEWS_API_KEY}"
    response = requests.get(url)
    data = response.json()

    articles = []
    for article in data.get("articles", []):
        articles.append({
            "title": article["title"],
            "description": article["description"]
        })

    return articles