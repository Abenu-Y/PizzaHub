
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/image/emojione_pizza.png';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../context/authContext';

function Header() {
  const [isOpen, setIsOpen] = useState(false); 
  const path = window.location.pathname; 
  const user = useAuth()
  console.log(user)
  

  return (
    <div>
      <div className="flex items-center justify-between px-8 py-4 max-w-[1440px]">
        <Link to='/' className="flex items-center gap-2">
          <img src={logo} alt="Pizza logo" className="h-10" />
        </Link>

        {/* Desktop Links */}
        <div className="flex justify-center flex-grow space-x-16 md:space-x-28">
          <Link to="/" className="text-xl font-semibold">Home</Link>
          <Link to={`/order-history/${user.user?.id}`} className="text-xl font-semibold">Orders</Link>
          <Link to="/about" className="hidden text-xl font-semibold md:block">Who we are</Link>
        </div>

        {/* Register Button (visible only on the home page) */}
        <div className="hidden md:block">
        {
        path === '/' && (
            user?.isAdmin ? (
              <Link to="dashboard?tab=orders" className="bg-[#FF9921] flex items-center justify-center text-2xl text-white rounded-lg py-2 px-8 font-semibold">
                DashBoard
              </Link>
            ) : (
              <Link to="/register" className="bg-[#FF9921] flex items-center justify-center text-2xl text-white rounded-lg py-2 px-8 font-semibold">
                Register
              </Link>
            )
          )}

        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="flex items-center justify-center p-2 text-gray-500 rounded-md md:hidden hover:bg-gray-100"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          {/* Icon for mobile menu toggle */}
          <MenuIcon />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="flex flex-col items-center px-8 py-4 space-y-2 bg-white shadow">
       
          {isOpen && (
            <>
              <Link to="/about" className="text-xl font-semibold">Who we are</Link>
              {path === '/' && (
                <Link to="/register" className="text-xl font-semibold">Register</Link>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
