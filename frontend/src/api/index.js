import axios from 'axios';

// 1. This checks if there is a 'VITE_API_URL' in your .env file
// 2. If not, it falls back to localhost:5000 for local development
const API = axios.create({ 
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' 
});

export const fetchProducts = () => API.get('/products');
// Add your other exports here...