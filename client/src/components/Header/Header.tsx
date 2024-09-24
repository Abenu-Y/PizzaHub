import { Link } from "react-router-dom"
import logo from '../../assets/image/emojione_pizza.png'

const Header = () => {
    return (
      <div  style={{boxShadow: "0px 0px 15px 0px #FF810033"}}>
           <div className="flex px-8 justify-between py-4 items-center">
               <Link to='/'className="flex gap-2 items-center">
                    <img src={logo} alt="Pizza logo" />
                    <h1 className="text-2xl text-[#AF5901] text-[20px] font-semibold">Pizza</h1>
               </Link>

               <div className="flex flex-row gap-12 ">
                     <Link to="/" className="text-xl font-semibold">Home</Link>
                     <Link to="/order" className="text-xl font-semibold">Orders</Link>
                     <Link to="/about" className="text-xl font-semibold">Who we are</Link>
               </div>

               <div>
                   <Link to="/register" className="bg-[#FF9921] flex items-center justify-center text-2xl text-white rounded-lg py-2 px-8 font-semibold">Register</Link>
               </div>
           </div>
      </div>
    )
  }
  
  export default Header