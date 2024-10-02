
import { MockStatusPizza } from "../../utils/data/constants"
import PizzaCard from "../../components/PizzaCard/PizzaCard";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import pizzaService from "../../services/pizza.service";
import { Pizza } from "../../utils/validation/type";
import { useLocation } from "react-router-dom";

const OrderHistory = () => {
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
    <div className=" bg-[#FFF8F1] w-full ">
        

        <div className="max-w-[1266px] mx-auto">
           <Header />

            <h2 className='text-[15px] max-w-[1261px] text-[#00000080] font-semibold md:text-[50px] leading-[22.5px] md:leading-[75px] max-h-[75px] mb-8 pl-6 md:pl-0'>Order History</h2>
            <div className="pb-8 custom_grid">
                {/* {
                    MockStatusPizza.map((pizza,index)=>(
                        <PizzaCard name = {pizza.name}  description={pizza.description} order_status={pizza?.order_status} key={index} />
                    ))
                }       */}
                 {
                   pizzainfo.map((pizza, index) => (
                    <PizzaCard pizza={pizza} key={index} />
                    ))
                 }
            </div> 

            </div>
   </div>
  )
}

export default OrderHistory