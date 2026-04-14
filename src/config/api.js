// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  NEWS: `${API_BASE_URL}/api/news`,
  CHAT: `${API_BASE_URL}/api/chat`,
  HEALTH: `${API_BASE_URL}/api/health`
};

export default API_BASE_URL;
