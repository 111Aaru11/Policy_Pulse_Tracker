from transformers import pipeline

sentiment_model = None

def get_sentiment_model():
    global sentiment_model
    if sentiment_model is None:
        sentiment_model = pipeline("sentiment-analysis")
    return sentiment_model

def analyze_sentiment(text):
    return get_sentiment_model()(text)