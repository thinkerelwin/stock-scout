import axios from 'axios';

const urlToRequest =
  process.env.NODE_ENV === 'production'
    ? 'https://stock-scout-backend.onrender.com'
    : 'http://localhost:5000/';

const instance = axios.create({
  baseURL: urlToRequest,
  timeout: 5000,
});

export { instance as default, urlToRequest };
