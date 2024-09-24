import { Link, useLocation } from "react-router-dom";
import logo from '../../assets/image/emojione_pizza.png';
import { useEffect, useState } from "react";

const Header = () => {

  const location = useLocation(); 
  const pathname = location.pathname; 
  const [path, setPath] = useState(''); 

  useEffect(() => {
    setPath(pathname);
  }, [pathname]);

  return (
    <div style={{ boxShadow: `${path === '/' && "0px 0px 15px 0px #FF810033"}` }}>
      
      <div className="flex items-center justify-between px-8 py-4">

        <Link to='/' className="flex items-center gap-2">
          <img src={logo} alt="Pizza logo" />
          <h1 className="text-2xl text-[#AF5901] text-[20px] font-semibold">Pizza</h1>
        </Link>

        <div className="flex flex-row gap-12">
          <Link to="/" className="text-xl font-semibold">Home</Link>
          <Link to="/order" className="text-xl font-semibold">Orders</Link>
          <Link to="/about" className="text-xl font-semibold">Who we are</Link>
        </div>

        {/* Register button appears only on the home page */}
        <div>
          {
            path === '/' && (
              <Link to="/register" className="bg-[#FF9921] flex items-center justify-center text-2xl text-white rounded-lg py-2 px-8 font-semibold">
                Register
              </Link>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Header;
