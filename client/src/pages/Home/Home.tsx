import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import PizzaCard from "../../components/PizzaCard/PizzaCard"
import orderUsImage from '../../assets/image/Image_order_us.png'
import leaveimage from '../../assets/image/leavepng.png'
import SearchIcon from '@mui/icons-material/Search';

// className="bg-[linear-gradient(180deg,_rgba(250,126,0,0)_0%,_rgba(250,126,0,0.2)_60.5%,_rgba(148,74,0,0)_100%)]
// className="bg-[linear-gradient(180deg,_rgba(250,126,0,0)_0%,_rgba(250,126,0,0.2)_60.5%,_rgba(148,74,0,0)_100%)]
const Home = () => {

  
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


  return (
    <div className="h-screen">
        <Header />

        <div style={{background: "linear-gradient(180deg, #FFFFFF 0%, #FFC993 76%, #FFF8F1 100%)"}} className="py-8 flex flex-row ">
                <div className="w-3/4 px-12">
                       <h1 className="order_us pt-12 text-9xl font-semibold py-8">Order us</h1>
                       <p className="w-3/4 text-2xl">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without.</p>
                       <div className="relative">
                            <input type="search"  placeholder="Search" className="rounded-full outline-none p-4 mt-4 w-3/4" />
                            <span className="bg-[#FF9921]  rounded-full text-white ">
                                <SearchIcon className="absolute top-4 bg-[#FF9921] text-2xl  rounded-full right-[250px]" />
                            </span>
                       </div>
                </div>

                <div className="w-1/4 relative">
                      <img src={orderUsImage} alt="Pizza" />
                      <img src={leaveimage} alt="leave iamge" className="absolute top-[-5px] right-48"/>
                </div>

        </div>


        <div className="py-12 px-24">
            <h1 className="text-3xl font-bold text-[rgba(0,0,0,0.5)]">Popular Pizzas</h1>
        </div>


       <div className="custom_grid">
            {
              MockPizza.map((pizza,index)=>(
                  <PizzaCard name = {pizza.name}  description={pizza.description} key={index} />
              )
              )
            }
      
       </div>
      
       <Footer />
    </div>
  )
}

export default Home