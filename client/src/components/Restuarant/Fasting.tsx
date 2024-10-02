import { Box} from '@mui/material';
import PizzaCard from '../PizzaCard/PizzaCard';
// import { MockPizza } from '../../utils/data/constants'
import pizzaService from '../../services/pizza.service';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Pizza } from '../../utils/validation/type';

const Fasting = () => {

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
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: "center",
                background: '#FFF8F1',
                paddingBlock: '50px', 
              
            }}

            className="relative left-[30px] md:left-[90px]"
        >
            <h2 className='text-[15px] max-w-[1261px] text-[#00000080] font-semibold md:text-[50px] leading-[22.5px] md:leading-[75px] max-h-[75px] mb-4'>Fatsing</h2>

            <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    alignItems: "center",
                    gap: 2, 
                    overflowX: 'scroll', 
                }}
                className="overflow_restaurant"
            >
                {/* {
                    MockPizza.map((pizza, index) => (
                        <PizzaCard key={index} name={pizza.name} description={pizza.description} />
                    ))
                } */}
                {
                pizzainfo.map((pizza, index) => (
                    <PizzaCard pizza={pizza} key={index} />
                ))
            }
            </Box>
        </Box>
    );
};

export default Fasting;
