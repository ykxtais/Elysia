import axios from "axios";

export const api = axios.create({
  baseURL: "https://elysia-api.azurewebsites.net/api",
  timeout: 15000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log("API ERROR:", err?.response?.status, err?.response?.data);
    throw err;
  }
);
