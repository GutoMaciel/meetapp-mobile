import axios from 'axios';
// import { API_URL } from 'react-native-dotenv';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;
