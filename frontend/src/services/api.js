import axios from 'axios';

// Create AXIOS instance configuration
const API = axios.create({
    baseURL: 'http://localhost:5001/api', // Match server port
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Attach JWT Token from localStorage if present
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('darshan_ease_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth Service Endpoints
export const authService = {
    login: async (email, password) => {
        const response = await API.post('/auth/login', { email, password });
        return response.data;
    },

    register: async (name, email, password, role = 'user') => {
        const response = await API.post('/auth/register', { name, email, password, role });
        return response.data;
    },

    getMe: async () => {
        const response = await API.get('/auth/me');
        return response.data;
    },
};

// Temple Service Endpoints
export const templeService = {
    getAll: async () => {
        const response = await API.get('/temples');
        return response.data;
    },

    getById: async (id) => {
        const response = await API.get(`/temples/${id}`);
        return response.data;
    },

    create: async (templeData) => {
        const response = await API.post('/temples', templeData);
        return response.data;
    },
};

export default API;
