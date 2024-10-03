import React from 'react';
import Header from "../Header/Header";
import orderUsImage from '../../assets/image/Image_order_us.png';
import leaveImage from '../../assets/image/leavepng.png';
import searchLogo from '../../assets/icon/Button.png';

const SearchAndOrder = () => {
  return (
    <div style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #FFC993 76%, #FFF8F1 100%)" }}>
      <div className="max-w-[1440px] mx-auto h-[600px] md:h-[937px] flex flex-col relative">
        <Header />

        <div className="flex flex-row items-start justify-between mx-6 mt-16 md:mx-12">
          {/* Left Section */}
          <div className="w-full md:w-3/4">
            <h1 className="bg-gradient-to-r from-[#FF8100] to-[#FFBE71] bg-clip-text text-transparent text-5xl md:text-9xl font-bold py-6">
              Order Us
            </h1>
            <p className="w-3/4 mb-6 text-gray-600 md:pl-6 md:w-1/2 text-md md:text-lg" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Fresh, flavorful, and fabulous—our pizzas are waiting to take your taste buds on an unforgettable journey. With every bite, you'll discover why our pizzas are loved by so many!
            </p>
            <div className="flex flex-row items-center mt-4">
              <input
                type="search"
                placeholder="Search"
                className="w-full max-w-[600px] p-4 rounded-full outline-none h-[3.5625rem] md:h-[7.375rem] placeholder:text-lg md:placeholder:text-2xl text-2xl"
              />
              <img
                src={searchLogo}
                alt="Search logo"
                className="relative object-contain h-8 md:h-[6.75rem] ml-[-50px] md:ml-[-110px]"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="relative flex items-center justify-center w-1/4">
            <img src={orderUsImage} alt="Order Us" className="w-full" />
            <img src={leaveImage} alt="Leave image" className="absolute top-[-10px] right-[-30px] w-[120px] h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchAndOrder;
