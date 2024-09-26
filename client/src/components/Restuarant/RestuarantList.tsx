import Card from './Card';
import { MockRestuarnt } from '../../utils/data/constants'

const RestaurantList = () => {

    return (

        <div  style={{ backgroundColor: '#FFF8F1', }}>
             <div className='h-[177px] md:h-[442px]' style={{ background: 'linear-gradient(180deg, rgba(250, 126, 0, 0) 0%, rgba(250, 126, 0, 0.2) 60.5%, rgba(148, 74, 0, 0) 100%)' }}>
                
                <div className=' md:max-w-[1440px] mx-auto'>
                    <div className='max-w-[609px] md:max-w-[1345px] max-h-[118px] md:max-h-[254px] m-auto relative top-[14px] max-md:left-[10px]  md:top-[94px]'>
                          <div className='flex flex-col  gap-[5px] md:gap-[15px]'>
                                <h2 className='text-[15px] text-[#00000080] font-semibold md:text-[50px] leading-[22.5px] md:leading-[75px] '>Top Restaurants</h2>

                                <div className='flex flex-row items-center gap-[20px] overflow-x-scroll overflow_restaurant'>
                                        {
                                          MockRestuarnt.map((restuarant, index) => (
                                        <Card key={index} name={restuarant.name} description={restuarant.description} />
                                         ))
                                         }
                                </div>
                          </div>
                    </div>
                </div>
                
             </div>
        </div>

    );
};

export default RestaurantList;
