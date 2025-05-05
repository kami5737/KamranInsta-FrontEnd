import axios from 'axios';

console.log("Environment:", process.env);

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
console.log("Using API URL:", API_URL); // Should show your URL

// Add request interceptor to log all requests
axios.interceptors.request.use(request => {
    console.log('Starting Request', request.url);
    return request;
  });

export const register = async (username, password, role) => {
  return await axios.post(`${API_URL}/register`, { username, password, role });
};

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('role', response.data.role);
  return response.data;
};

export const uploadMedia = async (formData) => {
    const token = localStorage.getItem('token');
    return await axios.post(`${API_URL}/media`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
      timeout: 30000 // 30 seconds for large files
    });
  };
  
  export const getComments = async (mediaId) => {
    return await axios.get(`${API_URL}/media/${mediaId}/comments`);
  };
export const getMedia = async () => {
    try {
      const response = await axios.get(`${API_URL}/media`);
      return response;
    } catch (error) {
      console.error("Full error details:", error);
      throw error;
    }
  };
  

// Add these new functions
export const postComment = async (mediaId, text) => {
  const token = localStorage.getItem('token');
  return await axios.post(`${API_URL}/media/${mediaId}/comments`, { text }, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

export const addRating = async (mediaId, value) => {
    const token = localStorage.getItem('token');
    return await axios.post(`${API_URL}/media/${mediaId}/ratings`, 
      { value },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
  };

axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        return Promise.reject(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        return Promise.reject({ message: 'No response from server' });
      } else {
        // Something happened in setting up the request
        return Promise.reject({ message: error.message });
      }
    }
  );