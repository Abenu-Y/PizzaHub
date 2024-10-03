

const api_url = import.meta.env.VITE_API_URL;
import axios from 'axios';
import { addRole } from '../utils/validation/type';


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


const addRoles = async(data:addRole, token:any)=>{
    try {
        const response = await axios.post(`${api_url}/api/role/create-role`,data, {
            headers:{
                Authorization:token
            }
        })
        if(response.status === 200 || response.status === 201){
            return response
        } else{
            // return response
            return null
        }
    } catch (error) {
        console.error(error)
    }
}



export default { fetchRoles, addRoles}