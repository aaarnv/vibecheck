import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = (userData) => axios.post(`${API_URL}/users/register`, userData);
export const login = (userData) => axios.post(`${API_URL}/users/login`, userData);
export const addMood = (moodData) => axios.post(`${API_URL}/moods`, moodData);
export const getMoods = (userId) => axios.get(`${API_URL}/moods/${userId}`);
