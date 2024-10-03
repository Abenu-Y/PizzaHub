const api_url = import.meta.env.VITE_API_URL;
import axios from 'axios';
import {formData} from '../utils/validation/type'

interface FormData {
    email: string;
    password: string;
}

const logIn = async (loginformData: FormData): Promise<any> => {
    let response;
    try {
       
        response = await axios.post(`${api_url}/api/auth/signin`, loginformData);
        if(response.status === 400){
              return {
                 status : 400,
                 message:"Invalid Credential"
              }
        }
    } catch (error) {
        return {
            status : 400,
            message:"Invalid Credential"
         }
        console.error('Login error:', error); // Log the error for debugging
        throw error; // Optionally re-throw the error to handle it outside this function
    }
    return response.data; // Return the response data
};

const register = async(registerformData:formData):Promise<any> =>{
   let response;
   try {
      response = await axios.post(`${api_url}/api/auth/register`,registerformData)
      return response;
   } catch (error) {
     console.error('Register error:', error); 
     throw error; 
   }
}

const logOut = (): void => {
    localStorage.removeItem("employee");
};

export default { logIn, logOut ,register};
