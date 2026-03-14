import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('userInfo')) || null,
  loading: false,
  error: null,

  // Login Action
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password });
      set({ user: data, loading: false });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
      set({ error: err.response?.data.message || 'Login failed', loading: false });
    }
  },

  // Register Action
  register: async (name, email, password, phone) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/register', { name, email, password, phone });
      set({ loading: false });
      return data; // Return to show the "Check Email" message in the component
    } catch (err) {
      set({ error: err.response?.data.message || 'Registration failed', loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('userInfo');
    set({ user: null });
  },
}));

export default useAuthStore;