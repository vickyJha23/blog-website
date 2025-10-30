import axios from "axios";

const axiosInstance = axios.create({
     baseURL: process.env.NEXT_PUBLIC_BASE_URI,
     withCredentials: true,
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);




axiosInstance.interceptors.response.use(
  (response) => {
       return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error, e.g., redirect to login
      console.log("Unauthorized! Redirecting to login...");
      localStorage.removeItem("accessToken");
      window.location.href = "/";
    }

    console.log(error);
    return Promise.reject(error);
  }
);






export default axiosInstance;