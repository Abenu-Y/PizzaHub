

const api_url = import.meta.env.VITE_API_URL;
import axios from 'axios';
import { addAdmin } from '../utils/validation/type';


const fetchRoles = async(token:any) =>{
    try {
        const response = await axios.get(`${api_url}/api/role/roles`,{
            headers:{
                Authorization:token
            }
        })
        if(response.status === 200){
            return response.data
        } else{
            // return response
            return null
        }
    } catch (error) {
        console.error(error)
    }
}


const addRole = async(data:addAdmin, token:any)=>{
    try {
        const response = await axios.post(`${api_url}/api/user/add-user`,data, {
            headers:{
                Authorization:token
            }
        })
        if(response.status === 200){
            return response.data
        } else{
            // return response
            return null
        }
    } catch (error) {
        console.error(error)
    }
}



export default { fetchRoles, addRole}