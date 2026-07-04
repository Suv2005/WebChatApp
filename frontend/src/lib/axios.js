import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "developement" ? "https://localhost:3000/api" : "/api",
    withCredentials: true,
})