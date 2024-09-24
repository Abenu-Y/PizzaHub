import { Typography } from "@mui/material"
import Header from "../../components/Header/Header"
import PizzaCard from "../../components/PizzaCard/PizzaCard"


const OrderHistory = () => {
  type mockObj={
    name:string,
    description:string,
    order_status:string
  }
  
  const MockPizza :mockObj[]=[
    {
        name:"Margherita",
        description:"Tomato, Mozzarella, Bell Peppers, Onions, Olives",
        order_status:"Ordered"
    },
    {
        name:"Hawaiian",
        description:"Tomato, Mozzarella, Ham, Pineapple,Olive,Ricotta",
        order_status:"Recieved"
    },
    {
        name:"Quattro Formaggi",
        description:"Tomato, Mozzarella, Parmesan, Gorgonzola, Ricotta",
        order_status:"Recieved"
    },
    {
        name:"Quattro Stagioni",
        description:"Tomato, Mozzarella, Ham, Pineapple, Olives, Artichokes",
        order_status:"Ordered"
    },
    {
        name:"Margherita",
        description:"Tomato, Mozzarella, Bell Peppers, Onions, Olives",
        order_status:"Recieved"
    },
    {
        name:"Hawaiian",
        description:"Tomato, Mozzarella, Ham, Pineapple,Olive,Onion",
        order_status:"Recieved"
    },
   
  ]
  
  return (
    <div>
         <div className="bg-[#FFF8F1] pb-8">
            <Header />
            <div className="pt-12 pl-4 custom_grid_typo">
                <Typography variant="h4" component="h2" sx={{ mb: 4 ,color: '#00000080', fontSize:'50px', fontWeight:500}}>Order History</Typography>
            </div>
            
            <div className="custom_grid">
                {
                    MockPizza.map((pizza,index)=>(
                        <PizzaCard name = {pizza.name}  description={pizza.description} order_status={pizza?.order_status} key={index} />
                    ))
                }      
            </div> 
        </div>
    </div>
  )
}

export default OrderHistory