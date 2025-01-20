import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://dummyjson.com",
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
});

export default axiosInstance;
