import axios from 'axios';
import './src/styles/global.css';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.API_URL
    : 'http://localhost:8888';

console.log(axios.defaults.baseURL);
