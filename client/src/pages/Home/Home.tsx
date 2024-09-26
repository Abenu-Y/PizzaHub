import Footer from "../../components/Footer/Footer";
import RestuarantList from "../../components/Restuarant/RestuarantList";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Fasting from "../../components/Restuarant/Fasting";
import 'typeface-roboto';
import SearchAndOrder from "../../components/SearchandOrder/SearchAndOrder";
import FeaturedPizza from "../../components/Carousel/FeaturedPizza";
import Popular from "../../components/Restuarant/Popular";


const Home = () => {
    const location = useLocation();
    const [tab, seTab] = useState('');
    
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            seTab(tabFromUrl);
        }
    }, [location.search]);

    console.log(tab);
  
  

    return (
        <div className="h-screen ">
            
            <SearchAndOrder />
            <FeaturedPizza />
            <RestuarantList />
          
            <div className="bg-[#FFF8F1] py-12">
                <div className="max-w-[1440px] mx-auto overflow-x-hidden">
                    <Popular />
                    <Fasting />
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Home;
