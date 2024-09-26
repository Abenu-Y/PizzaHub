import { Avatar, List, Divider } from '@mui/material';
import PizzaImg from '../../assets/image/Image.png';
import avatarImg from '../../assets/image/Ellipse8.png';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  name: string;
  description: string;
  order_status?: string;
};

const PizzaCard = ({ name, description, order_status }: Props) => {

  const [path, setPath] = useState(''); 
  const [orderDetail, setOrderDetail] = useState(''); 
  const location = useLocation(); 
  const navigate= useNavigate()

  // Update path and orderDetail when location changes
  useEffect(() => {
    const currentPath = location.pathname;
    setPath(currentPath);
    
    if (currentPath.startsWith('/order/')) {
      setOrderDetail(currentPath);
    }
  }, [location]);

  return (
    <div className="bg-white shadow-sm p-4 w-[387px] rounded-md">
      
      {/* Image section for pizza */}
      <div className="flex flex-col items-center">
        <div className="rounded-full bg-[#EA810033] w-[318px] h-[318px] flex justify-center items-center">
          <img src={PizzaImg} alt="Pizza Image" />
        </div>

        {/* Display name and description */}
        <div className={`flex flex-col ${path === '/order' ? 'items-center' : 'items-start text-left'}`}>
          <h2 className="text-lg font-bold">{name}</h2>
          <p className="text-sm text-gray-600">{description}</p>
        </div>

        {/* Show price and status or order button based on path */}
        {(path === '/' || (orderDetail && orderDetail.split('/')[2])) && (
          <>
            <div className="flex flex-row items-center justify-between w-full p-4">
              <span>
                <span className="text-[#01C550] font-bold text-2xl pr-1">150</span>
                <sup className="relative bottom-2 text-md">Birr</sup>
              </span>

              {/* Show order status or order button */}
              {order_status ? (
                <span className={`text-4xl font-bold ${order_status === 'Recieved' ? 'text-[#01C550]' : 'text-[#FF9921]'}`}>
                  {order_status}
                </span>
              ) : (
                <button onClick={()=>navigate('/order')} className="bg-[#FF9921] text-white font-semibold rounded-lg px-12 py-3">Order</button>
              )}
            </div>

            {/* Extra info displayed only on the home path */}
            {path === '/' && (
              <>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} aria-label="mailbox folders">
                  <Divider component="li" />
                </List>

                <div className="flex flex-row justify-between w-full p-4">
                  <Avatar alt="Azmera Pizza" src={avatarImg} />
                  <span className="text-[1.2rem] font-semibold">{name}</span>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PizzaCard;

