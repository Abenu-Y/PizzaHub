const api_url = import.meta.env.VITE_API_URL;
import axios from 'axios';

const getPizzas = async():Promise<any> =>{
    let response;
    try {
        response = await axios.get(`${api_url}/api/menu/all`, );
        return response.data
    } catch (error) {
        console.error('Fetch pizzas error:', error); // Log the error for debugging
        throw error; // Optionally re-throw the error to handle it outside this function
    }
 

}


const getPizzabyId = async(Id:number | string | undefined):Promise<any> =>{
    let response;
    if(!Id){
        return 'use valid id '
    }
    console.log("se",Id)
    try {
        response = await axios.get(`${api_url}/api/menu/single/${Id}`, );
        return response.data
    } catch (error) {
        console.error('Fetch pizzas error:', error); // Log the error for debugging
        throw error; // Optionally re-throw the error to handle it outside this function
    }
 
}


export default { getPizzas ,getPizzabyId}