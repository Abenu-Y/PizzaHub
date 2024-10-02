
const api_url = import.meta.env.VITE_API_URL;
import axios from 'axios';

interface OrderInfo {
    customer_id: number;
    restaurant_id: number;
    total_price: number;
    orderDetails :[
     { 
      pizza_id:number,
      topping_id:number,
      quantity:number
    }
    ]
  }

  type token = string | null | undefined

const addOrder = async(orderData:OrderInfo,token:token) =>{
    let response;
    try {
        response = await axios.post(`${api_url}/api/order/add`, orderData,{
            headers:{
                Authorization:token
            }
        });
        if(response.status === 201){
            return true
        } else{
            return false
        }
    } catch (error) {
        console.error('Login error:', error); // Log the error for debugging
        throw error; // Optionally re-throw the error to handle it outside this function
    }
}


export default { addOrder}