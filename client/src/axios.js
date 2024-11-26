import axios from 'axios';

const api = axios.create({
  baseURL: 'https://w-space-server.vercel.app/api', // Your backend URL
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://w-space-4tv1.vercel.app' // Your frontend URL
  }
});

export default api;