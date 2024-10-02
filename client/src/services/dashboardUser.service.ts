const api_url = import.meta.env.VITE_API_URL;
import axios from 'axios';
import { addAdmin } from '../utils/validation/type';

const getUsers = async(token:any) =>{
    try {
        const response = await axios.get(`${api_url}/api/user/all`,{
            headers:{
                Authorization:token
            }
        })
        if(response.status === 200){
            return response.data
        } else{
            // return response
            return response
        }
    } catch (error) {
        console.error(error)
    }
}


const addUser = async(data:addAdmin, token:any)=>{
    try {
        const response = await axios.post(`${api_url}/api/user/add-user`,data, {
            headers:{
                Authorization:token
            }
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

export default {getUsers,addUser}