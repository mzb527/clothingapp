import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api', 
  headers: {
    'Content-Type': 'application/json',
  },
    timeout: 5000, // Set a timeout of 5 seconds
});

// Add interceptor (optional, for auth, logging, etc.)
apiClient.interceptors.request.use(
    response =>  response,
    error => {
        console.error('API request error:', error);
        return Promise.reject(error);
    }
);

export default apiClient;