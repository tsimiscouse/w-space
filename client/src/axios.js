import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.w-space.site', // backend URL
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://www.w-space.site' // frontend URL
  }
});

export default api;