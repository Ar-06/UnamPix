import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const axiosPublics = axios.create({
  baseURL: `${API_URL}/publics`,
  withCredentials: true,
});

export default axiosPublics;
