const API_BASE_URL = "http://localhost:8000/api";

export const apiFetch = async (endpoint, method = "GET", data = null, headers = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: data ? JSON.stringify(data) : null,
    });

  if(!response.ok){
    const errorData = await response.json()
    console.log(errorData);
    throw errorData;
  }
  
    return { data: result, error: null };
  } catch (error) {
    //return { data: null, error };
    console.log(error);
  }
};
