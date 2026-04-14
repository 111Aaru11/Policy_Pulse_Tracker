from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

model = None

def get_model():
    global model
    if model is None:
        model = SentenceTransformer('all-MiniLM-L6-v2')
    return model

class RAGSystem:
    def __init__(self):
        self.texts = []
        self.index = faiss.IndexFlatL2(384)

    def add_documents(self, docs):
        self.texts.extend(docs)
        embeddings = get_model().encode(docs)
        self.index.add(np.array(embeddings))

    def search(self, query, k=3):
        q_emb = get_model().encode([query])
        D, I = self.index.search(np.array(q_emb), k)
        return [self.texts[i] for i in I[0]]

rag = RAGSystem()