import axios from "axios";

export const BASE_URL = "https://speako-backend-rgj1.onrender.com";

const API = axios.create({
  baseURL: `${BASE_URL}/api/`,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  isRefreshing = false;
  failedQueue = [];
};

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("access");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});


// 🔁 RESPONSE INTERCEPTOR (AUTO REFRESH)
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return API(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("refresh");

      if (!refreshToken) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(
          `${BASE_URL}/api/accounts/refresh/`,
          { refresh: refreshToken }
        );

        const newAccess = res.data.access;
        if (res.data.refresh) {
          localStorage.setItem("refresh", res.data.refresh);
        }

        localStorage.setItem("access", newAccess);

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        processQueue(null, newAccess);

        return API(originalRequest);

      } catch (err) {
        console.error("Token refresh failed:", err);
        localStorage.clear();
        window.location.href = "/login";
        processQueue(err, null);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
