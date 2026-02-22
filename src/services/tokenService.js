import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const setupTokenRefresh = () => {
  const refreshInterval = setInterval(async () => {
    const refreshToken = localStorage.getItem("refresh");
    const accessToken = localStorage.getItem("access");

    if (!refreshToken || !accessToken) {
      clearInterval(refreshInterval);
      return;
    }

    try {
      const accessPayload = JSON.parse(
        atob(accessToken.split(".")[1])
      );

      const expiryTime = accessPayload.exp * 1000;
      const currentTime = Date.now();
      const timeUntilExpiry = expiryTime - currentTime;

      if (timeUntilExpiry < 60000) {
        console.log("🔄 Proactively refreshing token...");
        
        const res = await axios.post(
          `${BASE_URL}/api/accounts/refresh/`,
          { refresh: refreshToken }
        );

        localStorage.setItem("access", res.data.access);
        
        if (res.data.refresh) {
          localStorage.setItem("refresh", res.data.refresh);
        }

        console.log("Token refreshed successfully");
      }
    } catch (err) {
      console.error(" Token refresh failed:", err.message);
      localStorage.clear();
    }
  }, 5 * 60 * 1000); 

  return refreshInterval;
};

export const decodeToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch (err) {
    return null;
  }
};


export const isTokenExpired = (token) => {
  const payload = decodeToken(token);
  if (!payload) return true;

  const expiryTime = payload.exp * 1000;
  return Date.now() >= expiryTime;
};


export const getTokenExpireTime = (token) => {
  const payload = decodeToken(token);
  if (!payload) return 0;

  const expiryTime = payload.exp * 1000;
  return Math.round((expiryTime - Date.now()) / 1000 / 60);
};
