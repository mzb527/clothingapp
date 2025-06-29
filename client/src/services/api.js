import axios from 'axios';
import { API_URL } from '../config';

// create a single axios instance for your entire app
const API = axios.create({
  baseURL: API_URL,
  timeout: 10_000,
});

export default API;