import { Link } from "react-router-dom"
import pizzaImg1 from '../../assets/image/emojione_pizza.png'
import NearMeIcon from '@mui/icons-material/NearMe';
import { TextField } from "@mui/material";

const FooterNavigationBar = () => {
  return (
    <div className="bg-[#CCB691]">
      <div className="flex justify-between items-center px-8 py-24">
        <div className="flex gap-8 flex-col justify-center md:flex-row  font-semibold">
            <Link to="/">Home</Link>
            <Link to="/order">Order</Link>
            <Link to="/about_us">About Us</Link>
        </div>

        <div className="flex flex-col justify-center items-center relative">
            <div className='flex gap-2 items-center my-4 absolute top-[-80px]'>
              <img src={pizzaImg1} alt="" />
              <span className='text-[#AF5901] text-[20px] font-medium'>Pizza</span>
            </div> 

            <div className="relative">
                <TextField
                    id="filled-search"
                    label="Your feedback..."
                    type="search"
                    className="bg-white rounded-lg w-[200px] md:w-[400px] transition-all duration-300 ease-in-out"
                    variant="filled"
                    // sx={{width:"400px"}}
                />
                <NearMeIcon sx={{color:'#FF9921', position:"absolute", top:"15px", right:"20px"}} />
            </div>
        </div>
    </div>
    </div>
  )
}

export default FooterNavigationBar