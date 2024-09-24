import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import PizzaCard from "../../components/PizzaCard/PizzaCard";
import orderUsImage from '../../assets/image/Image_order_us.png';
import leaveimage from '../../assets/image/leavepng.png';
import SearchIcon from '@mui/icons-material/Search';
import RestuarantList from "../../components/Restuarant/RestuarantList";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Fasting from "../../components/Restuarant/Fasting";

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
  
    type mockObj = {
        name: string,
        description: string
    };

    const MockPizza: mockObj[] = [
        { name: "Margherita", description: "Tomato, Mozzarella, Bell Peppers, Onions, Olives" },
        { name: "Hawaiian", description: "Tomato, Mozzarella, Ham, Pineapple, Onion, Olives" },
        { name: "Quattro Formaggi", description: "Tomato, Mozzarella, Parmesan, Gorgonzola, Ricotta" },
        { name: "Quattro Stagioni", description: "Tomato, Mozzarella, Ham, Pineapple, Olives, Artichokes" },
        { name: "Margherita", description: "Tomato, Mozzarella, Bell Peppers, Onions, Olives" },
        { name: "Hawaiian", description: "Tomato, Mozzarella, Ham, Pineapple, Olives, Onion" },
        { name: "Quattro Formaggi", description: "Tomato, Mozzarella, Parmesan, Gorgonzola, Ricotta" },
        { name: "Quattro Stagioni", description: "Tomato, Mozzarella, Ham, Pineapple, Olives, Artichokes" },
    ];

    return (
        <div className="h-screen">
            <Header />
            <div style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #FFC993 76%, #FFF8F1 100%)" }} className="flex flex-row py-8">
                <div className="w-3/4 px-12">
                    <h1 className="py-8 pt-12 font-semibold order_us text-9xl">Order us</h1>
                    <p className="w-3/4 text-2xl">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without.</p>
                    <div className="relative">
                        <input type="search" placeholder="Search" className="w-3/4 p-4 mt-4 rounded-full outline-none" />
                        <span className="bg-[#FF9921] rounded-full text-white">
                            <SearchIcon className="absolute top-4 bg-[#FF9921] text-2xl rounded-full right-[250px]" />
                        </span>
                    </div>
                </div>
                <div className="relative w-1/4">
                    <img src={orderUsImage} alt="Pizza" />
                    <img src={leaveimage} alt="Leave image" className="absolute top-[-5px] right-48" />
                </div>
            </div>

            <RestuarantList />

            <div className="bg-[#FFF8F1]">
                <div className="px-20 pt-12">
                    <Typography variant="h4" component="h2" sx={{ mb: 4, color: '#00000080', fontSize: '50px', fontWeight: 500 }}>
                        Popular Pizzas
                    </Typography>
                </div>
                <div className="custom_grid">
                    {
                        MockPizza.map((pizza, index) => (
                            <PizzaCard name={pizza.name} description={pizza.description} key={index} />
                        ))
                    }
                </div>
            </div>

            <Fasting />

            <Footer />
        </div>
    );
};

export default Home;
