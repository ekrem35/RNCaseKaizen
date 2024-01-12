import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.extrazone.com/',
  timeout: 10000,
  headers: {'X-Country-Id': 'TR', 'X-Language-Id': 'TR'},
});

export default instance;
