
const api_url = import.meta.env.VITE_API_URL;
import axios from 'axios';
// import { addMenu } from '../utils/validation/type';

const addMENU = async(pizzaInfo:any,token:string | undefined) =>{
   try {
        const response = await axios.post(`${api_url}/api/menu/add`,pizzaInfo,{
            headers:{
                Authorization:token} 
            })

            if(response.status === 201|| response.status === 200){
                return response
            } else{
                // return response
                return {
                    status:400
                }
            }
    } catch (error) {
            console.error(error)
            return {
                status:400,
                error
            }
        }
}



export default { addMENU}