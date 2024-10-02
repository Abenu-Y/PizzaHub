import { Button, Checkbox, FormControlLabel } from "@mui/material";
import orderImage from '../../assets/Design/ordeimage.png';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import PizzaCard from "../../components/PizzaCard/PizzaCard";
import { FormEvent, useEffect, useState } from "react";
// import { MockPizza } from "../../utils/data/constants";
import { defineAbility } from "../../services/permission/persmission";
import { useAuth } from "../../context/authContext";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import pizzaService from "../../services/pizza.service";
import { PizzaId,Pizza } from "../../utils/validation/type";
import orderService from "../../services/order.service";
// import ConfirmationDialog from "../../components/Modal/ConfirmationDialog";

const defaultPizza: PizzaId = {
  pizza_base_price: 0,
  pizza_name: "",
  pizza_id: 0,
  restaurant_name: "",
  restaurant_id:0,
  topping_id:0,
  toppings: [],
};

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

const OrderDetail = () => {
  const location = useLocation();
  const { id } = useParams();
  const [pizzainfo, setPizzaInfo] = useState<Pizza[]>([]);
  const [specpizza, setSpecPizza] = useState<PizzaId>(defaultPizza);
  const [notfiy,setNofify] =useState<boolean>(false)
  const [item, setItem] = useState<number>(1);
  const user = useAuth(); // Get the authenticated user
  const ability = defineAbility(user.isLogged); // Pass `true` if the user is authenticated
  // const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false)
  const token = user.user?.token
    console.log(token)
  
  // Handle closing the modal
  const handleClose = () => {
    setOpen(false);
  };

  const getAllPizza = async () => {
    try {
      const response = await pizzaService.getPizzas();
      if (response.status === 200) {
        setPizzaInfo(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPizzabyID = async () => {
    try {
      const response = await pizzaService.getPizzabyId(id);
      if (response.status === 200) {
        setSpecPizza(response?.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Increment = () => {
    if (item >= 1) {
      setItem(item + 1);
    }
  };

  const Decrement = () => {
    if (item > 1) {
      setItem(item - 1);
    }
  };

  
  
  console.log(user)
  const handleOrder = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (ability.can('order', 'Pizza')) {
        // alert('You have permission to order');
        const orderDATA: OrderInfo = {
          customer_id: user.user?.id || 0  ,
          restaurant_id: specpizza.restaurant_id,
          total_price: +specpizza.pizza_base_price,
          orderDetails:[
            {
              pizza_id: +specpizza.pizza_id,
              quantity: item,
              topping_id:+specpizza.topping_id
            }
          ],
          
        };

      

        const response = await orderService.addOrder(orderDATA,token);
        console.log("mn metah", response)
        
        if(response){
          // alert('Order Placed Successfully')
          setIsOrdered(true)
          
        } else{
           setNofify(true)
        }
        
        
        // navigate('/login', { state: { redirectTo: `/order`, itemCount: item } });
      } else {
        // alert('You don\'t have permission to order');
        setNofify(true)
        // navigate('/login'); // Redirect to login if they can't order
      }
    } catch (error) {
      console.error("Error placing order", error);
    }
  };

  useEffect(() => {
    getAllPizza();
    getPizzabyID();
  }, [location.state]);

  return (
    <div className="bg-[#FFF8F1] p-8 min-w-full">
      <div className="flex flex-col md:flex-row max-w-[1440px] mx-auto">

        
        <div className="md:w-[55%] flex flex-row h-[500px]">
          <img src={orderImage} alt="Order" className="object-contain" />
        </div>

        {/* Pizza details and controls */}
        <form className="w-full md:w-[45%] p-6" onSubmit={handleOrder}>
          <div>
            <h2 className="pb-6 font-bold text-7xl">{specpizza.pizza_name}</h2>

            {/* Toppings options */}
            <div className="flex flex-row flex-wrap w-3/4 gap-6 topping">
              {specpizza.toppings?.map((topping, index) => (
                <FormControlLabel 
                  key={index} 
                  control={<Checkbox defaultChecked sx={{ color: '#FF9921' }} />} 
                  label={topping.name} 
                />
              ))}
              <FormControlLabel disabled control={<Checkbox />} label="Olives" />
            </div>

            {/* Quantity and price control */}
            <div className="flex items-center gap-6 py-6 amount">
              <Button 
                onClick={Decrement} 
                variant="outlined" 
                sx={{ color: "#141414", fontSize: "20px", borderColor: "#FF9921" }}
              >
                -
              </Button>
              <span>{item}</span>
              <Button 
                onClick={Increment} 
                variant="outlined" 
                sx={{ color: "#141414", fontSize: "20px", borderColor: "#FF9921" }}
              >
                +
              </Button>
              <span className="text-[#01C550] font-semibold text-2xl">
                {+specpizza.pizza_base_price * item} <sup className="text-sm text-black">Birr</sup>
              </span>

             
            </div>

            <Button
              variant="contained"
              sx={{ backgroundColor: '#FF9921', color: 'white', display: "flex", justifyContent: "space-between", padding: "20px" }}
              className="rounded-lg"
              fullWidth
              type="submit"
            >
              <span className="font-semibold">Order</span>
              <ArrowOutwardIcon />
            </Button>


             {
                notfiy && (
                   <div className="pt-3 text-center text-red-500">You need to sign in to make an order. <span className="text-blue-500"> <Link to='/login'>Log in</Link></span></div>
                   
                )
              }

              {
                isOrdered && (
                  <div className="pt-4 text-xl text-green-500">
                          {`Your order for the ${specpizza.pizza_name} from ${specpizza.restaurant_name} has been placed successfully!`}
                  </div>
                )
              }
          </div>
        </form>
      </div>

      <div className="max-w-[1440px] mx-auto">
        {/* Related pizzas section */}
        <div className="py-20">
          <h1 className="text-3xl font-bold text-[rgba(0,0,0,0.5)]">Related</h1>
        </div>

        {/* List of related pizzas */}
        <div className="flex flex-col gap-6 md:flex-row md:overflow-x-scroll pizzaCardContainer">
          {pizzainfo.map((pizza, index) => (
            <PizzaCard pizza={pizza} key={index} />
          ))}
        </div>
      </div>

   
    </div>
  );
};

export default OrderDetail;
