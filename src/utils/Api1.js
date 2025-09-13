import axios from 'axios'
const API_BASE_URL = "http://localhost:8000/api";
export const Api1= async (endpoint , method = "GET", data = null , headers = {}) =>{
    try{
        const response = await axios({
            url:`${API_BASE_URL}${endpoint}`,
            method,
            data,
            headers:{
                "Content-Type": "application/json",
                ...headers
            },
        });
        console.log (response);
        return {
            data:response.data,
            error:null,
            status:response.status
        }
    }catch (error){
         return {
      data: null,
      error: error.response ? error.response.data : error.message, 
      status: error.response ? error.response.status : 500,
    };
    }
}