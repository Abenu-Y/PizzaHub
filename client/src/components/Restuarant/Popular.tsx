import PizzaCard from "../PizzaCard/PizzaCard";
// import { MockPizza } from "../../utils/data/constants";
import { useEffect, useState } from "react";
import {  useLocation } from "react-router-dom";
import pizzaService  from '../../services/pizza.service'
import { Pizza } from '../../utils/validation/type'

const Popular = () => {
    const location = useLocation();
    const [pizzainfo, setPizzaInfo] = useState<Pizza[]>([])
    
  console.log(pizzainfo)
    const getAllPizza = async() =>{
         try {
              const response = await pizzaService.getPizzas();
            //   console.log(response, response.data)
              if(response.status === 200){
                setPizzaInfo(()=>response?.data)
              }
         } catch (error) {
             console.log(error);
         }
    }

    useEffect(()=>{
       getAllPizza();
    },[location.state])
    
  return (
    <div className="max-w-[1266px] mx-auto ">

            <h2 className='text-[15px] max-w-[1261px] text-[#00000080] font-semibold md:text-[50px] leading-[22.5px] md:leading-[75px] max-h-[75px] mb-8 pl-6 md:pl-0'>Popular Pizzas</h2>

        <div className="custom_grid ">
            {
                pizzainfo.map((pizza, index) => (
                    <PizzaCard pizza={pizza} key={index} />
                ))
            }
        </div>
   </div>
  )
}

export default Popular