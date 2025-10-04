import axios from 'axios'
const API_BASE_URL = "http://localhost:8000/api";
export const Api1= async (endpoint , method = "GET", data = null , headers = {}) =>{
    const retries = 3;        // jumlah percobaan ulang
  const retryDelay = 2000;  // jeda antar retry (ms)
  let attempt = 0;

  while (attempt <= retries) {
    try {
      const response = await axios({
        url: `${API_BASE_URL}${endpoint}`,
        method,
        data,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });

      return {
        data: response.data,
        error: null,
        status: response.status,
      };
    } catch (error) {
      attempt++;

      if (attempt > retries) {
        return {
          data: null,
          error: error.response ? error.response.data : error.message,
          status: error.response ? error.response.status : 500,
        };
      }

      console.warn(
        `Request gagal (percobaan ${attempt}), mencoba ulang dalam ${retryDelay}ms...`
      );

      // delay sebelum mencoba ulang
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
    }
  }
}