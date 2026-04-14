from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

model = SentenceTransformer('all-MiniLM-L6-v2')

class RAGSystem:
    def __init__(self):
        self.texts = []
        self.index = faiss.IndexFlatL2(384)

    def add_documents(self, docs):
        self.texts.extend(docs)
        embeddings = model.encode(docs)
        self.index.add(np.array(embeddings))

    def search(self, query, k=3):
        q_emb = model.encode([query])
        D, I = self.index.search(np.array(q_emb), k)
        return [self.texts[i] for i in I[0]]

rag = RAGSystem()