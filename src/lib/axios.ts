import { useAuthStore } from '@/stores/useAuthStore';
import axios from 'axios';

// Create axios instance with interceptors
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // If 401 error and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const refreshed = await useAuthStore.getState().refreshAuthToken();

        if (refreshed) {
          // Retry the original request with new token
          const token = localStorage.getItem('auth_token');
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        } else {
          // Refresh failed, logout user
          useAuthStore.getState().logout();
          window.location.href = '/acceso';
        }
      } catch (refreshError) {
        useAuthStore.getState().logout();
        window.location.href = '/acceso';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
