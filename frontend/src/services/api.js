import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

export const register = (userData) => axios.post(`${API_URL}/users/register`, userData);
export const login = (userData) => axios.post(`${API_URL}/users/login`, userData);

// Function to fetch moods for a specific user
export const getVibes = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/vibes/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
  
  // Function to add a new mood entry
  export const addVibe = async (vibeData) => {
    try {
      const response = await axios.post(`${API_URL}/vibes`, vibeData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
  
  // Function to fetch friends' vibe entries
  export const getFriendsVibes = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/friends/${userId}/moods`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

    // Function to fetch friends' vibe entries
    export const getUserVibes = async (userId) => {
        try {
          const response = await axios.get(`${API_URL}/friends/${userId}/moods`);
          return response.data;
        } catch (error) {
          throw new Error(error.response.data.message);
        }
      };
  
  // Example function for fetching user notifications (if applicable)
  export const getUserNotifications = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/notifications/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };