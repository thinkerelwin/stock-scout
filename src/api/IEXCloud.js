import axios from 'axios';

const urlToRequest =
  process.env.NODE_ENV === 'production'
    ? 'https://stock-scout-backend.herokuapp.com/'
    : 'http://localhost:5000/';

const instance = axios.create({
  baseURL: 'https://stock-scout-backend.herokuapp.com/',
  timeout: 3000
});

export default instance;
