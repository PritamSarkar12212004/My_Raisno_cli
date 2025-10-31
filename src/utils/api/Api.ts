import axios from 'axios';
const Api = axios.create({
  baseURL: 'https://my-raisoni-backend.vercel.app',
});
export default Api;
