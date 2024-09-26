import { Button, Checkbox, FormControlLabel } from "@mui/material";
import pizzaImg1 from '../../assets/image/Frame.png';
import pizzaImg2 from '../../assets/image/Group7.png';
import pizzaImg3 from '../../assets/image/Group8.png';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import PizzaCard from "../../components/PizzaCard/PizzaCard";
import { useState } from "react";
import { MockPizza } from "../../utils/data/constants";

const OrderDetail = () => {
  const [item,setItem] = useState(1)

  const Increment =()=>{
    if(item >=1){
      setItem(()=>item+1)
    }
  }
  const Decrement =()=>{
    if(item >1){
      setItem(()=>item-1)
    }
 }

  return (
    <div className="bg-[#FFF8F1] p-8">
      
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-[55%] flex flex-row h-[500px] object-contain">
          <div>
            <img src={pizzaImg1} alt="Main Pizza" />
          </div>

          <div className="flex flex-col object-contain gap-20">
            <img src={pizzaImg3} alt="Pizza variant" />
            <img src={pizzaImg2} alt="Pizza variant" />
          </div>
        </div>

        {/* Pizza details and controls */}
        <div className="w-full md:w-[45%] p-6">
          <h2 className="pb-6 font-bold text-7xl">Margherita</h2>

          {/* Toppings options */}
          <div className="flex flex-row flex-wrap w-3/4 gap-6 topping">
            <FormControlLabel control={<Checkbox defaultChecked sx={{ color: '#FF9921' }} />} label="Mozzarella" />
            <FormControlLabel control={<Checkbox sx={{ color: '#FF9921' }} />} label="Tomato" />
            <FormControlLabel control={<Checkbox sx={{ color: '#FF9921' }} />} label="Bell Peppers" />
            <FormControlLabel control={<Checkbox sx={{ color: '#FF9921' }} />} label="Onions" />
            <FormControlLabel disabled control={<Checkbox />} label="Olives" />
          </div>

          {/* Quantity and price control */}
          <div className="flex items-center gap-6 py-6 amount">
            <Button onClick={Decrement} variant="outlined" sx={{ color: "#141414", fontSize: "20px", borderColor: "#FF9921" }}>-</Button>
            <span>{item}</span>
            <Button onClick={Increment} variant="outlined" sx={{ color: "#141414", fontSize: "20px", borderColor: "#FF9921" }}>+</Button>
            <span className="text-[#01C550] font-semibold text-2xl">{150*item} <sup className="text-sm text-black">Birr</sup></span>
          </div>

          <Button
            variant="contained"
            sx={{ backgroundColor: '#FF9921', color: 'white', display: "flex", justifyContent: "space-between", padding: "20px" }}
            className="rounded-lg"
            fullWidth
          >
            <span className="font-semibold">Order</span>
            <ArrowOutwardIcon />
          </Button>
        </div>
      </div>

      {/* Related pizzas section */}
      <div className="py-20">
        <h1 className="text-3xl font-bold text-[rgba(0,0,0,0.5)]">Related</h1>
      </div>

      {/* List of related pizzas */}
      <div className="flex flex-col gap-6 md:flex-row md:overflow-x-scroll pizzaCardContainer">
        {
          MockPizza.map((pizza, index) => (
            <PizzaCard key={index} name={pizza.name} description={pizza.description} />
          ))
        }
      </div>
    </div>
  );
};

export default OrderDetail;
