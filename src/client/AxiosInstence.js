import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://fakestoreapi.com",
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}, (error) => {
    return Promise.reject(error)
});

axiosClient.interceptors.response.use((resp) => {

    return resp;
}, (error) => {
    if (error.response.status === 530) {
        window.location.href = "/sign-in";
    }
});

export default axiosClient;