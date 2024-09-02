import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

axios.defaults.withCredentials = true;

export const checkAuth = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/check`);
    return response.data.isAuthenticated;
  } catch (err) {
    console.error('Error checking authentication:', err);
    return false;
  }
};

export const register = (userData) => axios.post(`${API_URL}/users/register`, userData);
export const login = (userData) => axios.post(`${API_URL}/users/login`, userData);

// Function to fetch moods for the logged-in user
export const getVibes = async () => {
  try {
    const response = await axios.get(`${API_URL}/vibes`);
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
export const getFriendsVibes = async () => {
  try {
    const response = await axios.get(`${API_URL}/vibes/friends`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Function to fetch user vibe entries (if needed)
export const getUserVibes = async () => {
  try {
    const response = await axios.get(`${API_URL}/vibes`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Example function for fetching user notifications (if applicable)
export const getUserNotifications = async () => {
  try {
    const response = await axios.get(`${API_URL}/notifications`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteVibe = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/vibes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting vibe:', error);
    throw error;
  }
};

export const updateVibeShareStatus = async (vibeId, shareStatus) => {
  try {
      const response = await axios.patch(`${API_URL}/vibes/${vibeId}/share`, { share: shareStatus });
      return response.data;
  } catch (error) {
      console.error('Error updating vibe share status:', error);
      throw error; // Re-throw the error to be handled by the calling function
  }
};

// Example function for fetching user notifications (if applicable)
export const getFriendRequests = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/friend-requests`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Function to fetch user vibe entries (if needed)
export const searchUsers = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/users/search?query=${query}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const sendFriendRequest = async (id) => {
  try {
    const response = await axios.post(`${API_URL}/users/${id}/friend-request`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const respondFriendRequest = async (id, response) => {
  try {
    const res = await axios.post(`${API_URL}/users/${id}/respond-friend-request`, { response });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getFriends = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/friends`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};