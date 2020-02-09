import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://stock-scout-backend.herokuapp.com/',
  timeout: 1500
});

export default instance;
