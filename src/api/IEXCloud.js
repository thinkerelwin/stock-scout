import axios from 'axios';

const urlToRequest =
  process.env.NODE_ENV === 'production'
    ? 'https://stock-scout-backend.herokuapp.com/'
    : 'http://localhost:5000/';

const instance = axios.create({
  baseURL: urlToRequest,
  timeout: 3000
});

export default instance;
