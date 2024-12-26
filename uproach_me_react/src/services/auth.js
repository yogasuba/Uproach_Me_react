import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Change to your backend's URL

export const signUp = (email, password) => {
  return axios.post(`${API_URL}/signup`, { email, password });
};

export const signIn = (email, password) => {
  return axios.post(`${API_URL}/signin`, { email, password });
};

export const getUserProfile = (token) => {
  return axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
