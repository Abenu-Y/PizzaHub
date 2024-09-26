import PizzaCard from "../PizzaCard/PizzaCard";
import { MockPizza } from "../../utils/data/constants";

const Popular = () => {
  return (
    <div className="max-w-[1266px] mx-auto ">

            <h2 className='text-[15px] max-w-[1261px] text-[#00000080] font-semibold md:text-[50px] leading-[22.5px] md:leading-[75px] max-h-[75px] mb-8 pl-6 md:pl-0'>Popular Pizzas</h2>

        <div className="custom_grid ">
            {
                MockPizza.map((pizza, index) => (
                    <PizzaCard name={pizza.name} description={pizza.description} key={index} />
                ))
            }
        </div>
   </div>
  )
}

export default Popular