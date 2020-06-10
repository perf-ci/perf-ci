import axios from 'axios';

// eslint-disable-next-line no-undef
const baseURL = process.env.REACT_APP_BACKEND_URL === undefined ? 'https://0.0.0.0:8000' : process.env.REACT_APP_BACKEND_URL;

export const backendAPI = axios.create({
  // withCredentials: true,
  baseURL: baseURL,
  timeout: 30000,
});
