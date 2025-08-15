// apiRequest.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export default async function apiRequest(method, endpoint, data = null) {
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${endpoint}`,
      data,
      withCredentials: true
    });
    return response;

  } catch (error) {
    if (error.response?.status === 401 && error.response?.data?.reason === "TOKEN_EXPIRED") {
      console.warn("Access token expired. Trying to refresh...");

      try {
        // Refresh the access token
        await axios.get(`${BASE_URL}/user/renewrefreshtoken`, { withCredentials: true });

        // Retry the original request
        return await axios({
          method,
          url: `${BASE_URL}${endpoint}`,
          data,
          withCredentials: true
        });

      } catch (refreshError) {
        console.error("Refresh token failed. Redirecting to login...");
      }
    }

    // If it's not TOKEN_EXPIRED or something else failed
    throw error;
  }
}
