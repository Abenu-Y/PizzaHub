import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material"
import pizzaImg1 from '../../assets/image/Frame.png'
import pizzaImg2 from '../../assets/image/Group7.png'
import pizzaImg3 from '../../assets/image/Group8.png'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import PizzaCard from "../../components/PizzaCard/PizzaCard";

type mockObj={
    name:string,
    description:string
}

const MockPizza :mockObj[]=[
    {
        name:"Margherita",
        description:"Tomato, Mozzarella, Bell Peppers, Onions, Olives"
    },
    {
        name:"Hawaiian",
        description:"Tomato, Mozzarella, Ham, Pineapple"
    },
    {
        name:"Quattro Formaggi",
        description:"Tomato, Mozzarella, Parmesan, Gorgonzola, Ricotta"
    },
    {
        name:"Quattro Stagioni",
        description:"Tomato, Mozzarella, Ham, Pineapple, Olives, Artichokes"
    },
    {
        name:"Margherita",
        description:"Tomato, Mozzarella, Bell Peppers, Onions, Olives"
    },
    {
        name:"Hawaiian",
        description:"Tomato, Mozzarella, Ham, Pineapple"
    },
    {
        name:"Quattro Formaggi",
        description:"Tomato, Mozzarella, Parmesan, Gorgonzola, Ricotta"
    },
    {
        name:"Quattro Stagioni",
        description:"Tomato, Mozzarella, Ham, Pineapple, Olives, Artichokes"
    },
]

const OrderDetail = () => {
  return (
    <div className="bg-[#FFF8F1] p-8">
        <div  className="flex flex-col md:flex-row ">
             <div className="w-full md:w-[55%] flex flex-row h-[500px] object-contain">
                  <div>
                         <img src={pizzaImg1} alt="" />
                  </div>

                  <div className="flex flex-col gap-20 object-contain">
                       <img src={pizzaImg3} alt="" />
                       <img src={pizzaImg2} alt="" />
                  </div>
             </div>

             <div className="w-full md:w-[45%] p-6">
                  <h2 className="font-bold text-7xl pb-6">Margherita</h2>
                  <div className="topping w-3/4 flex flex-row flex-wrap gap-6">
                        {/* <FormGroup className="flex flex-row flex-wrap gap-4"> */}
                            <FormControlLabel control={<Checkbox defaultChecked style={{ color: '#FF9921' }}/>} label="Mozzarella" />
                            <FormControlLabel  control={<Checkbox style={{ color: '#FF9921' }} />}  label="Tomato" />
                            <FormControlLabel  control={<Checkbox style={{ color: '#FF9921' }}/>}  label="Bell Peppers" />
                            <FormControlLabel  control={<Checkbox style={{ color: '#FF9921' }}/>}  label="Onions" />
                            <FormControlLabel disabled control={<Checkbox />} label="Olives" />
                        {/* </FormGroup> */}
                  </div>

                  <div className="amount flex gap-6 py-6 items-center">
                      <Button variant="outlined" sx={{color:"#141414",fontSize:"20px", borderColor:"#FF9921"}}>-</Button>
                      <span>1</span>
                      <Button variant="outlined" sx={{color:"#141414",fontSize:"20px", borderColor:"#FF9921"}}>+</Button>
                      <span  className="text-[#01C550] font-semibold text-2xl"> 150 <sup className="text-black text-sm">Birr</sup></span>
                  </div>

                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ backgroundColor: '#FF9921', color: 'white' ,display:"flex",justifyContent:"space-between",padding:"20px"
                    }}
                    className="rounded-lg"
                    fullWidth
                    >
                    <span className="font-semibold">Order</span>
                    <ArrowOutwardIcon />
                </Button>

             </div>

        </div>

        <div className="py-20">
            <h1 className="text-3xl font-bold text-[rgba(0,0,0,0.5)]">Related</h1>
        </div>
        
        <div className="flex flex-col md:flex-row md:overflow-x-scroll gap-6 pizzaCardContainer" >
            {
                MockPizza.map((pizza, index) => (
                    <PizzaCard key={index} name={pizza.name} description={pizza.description} />
                ))
            }
           
        </div>

    </div>
  )
}

export default OrderDetail