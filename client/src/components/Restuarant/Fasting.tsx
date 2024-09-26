import { Box} from '@mui/material';
import PizzaCard from '../PizzaCard/PizzaCard';
import { MockPizza } from '../../utils/data/constants'

const Fasting = () => {
  
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
                {
                    MockPizza.map((pizza, index) => (
                        <PizzaCard key={index} name={pizza.name} description={pizza.description} />
                    ))
                }
            </Box>
        </Box>
    );
};

export default Fasting;
