import axios from "axios";

export const BASE_API_URL = "https://swapi.dev/api";

export const axiosInstance = axios.create({
  baseURL: BASE_API_URL
});
