import Header from "../Header/Header"
import orderUsImage from '../../assets/image/Image_order_us.png';
import leaveImage from '../../assets/image/leavepng.png';
import searchLogo from '../../assets/icon/Button.png';



const SearchAndOrder = () => {
  return (
    <div style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #FFC993 76%, #FFF8F1 100%)" }} >
        <div className="max-w-[1440px] h-[937px] gap-0 opacity-100 flex flex-col mx-auto relative">
             <Header />
             {/* <div
          className="absolute flex flex-col"
          style={{
            width: '766px',
            height: '501px',
            top: '164px',
            left: '85px',
            gap: '50px',
            // opacity: 0, // Change to 1 for testing visibility
          }}
        >
          <h1 className="bg-gradient-to-r from-[#FF8100] to-[#FFBE71] bg-clip-text text-transparent text-9xl font-bold py-6">
            Order us
          </h1>
          <p className="text-2xl leading-9 " style={{ fontFamily: 'Roboto, sans-serif' }}>
            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without.
          </p>

          <div className="flex flex-row items-center mt-4">
            <input
              type="search"
              placeholder="Search"
              className="w-[748px] p-12 rounded-full outline-none 
                         h-[3.5625rem] md:h-[7.375rem] 
                         placeholder:text-lg md:placeholder:text-2xl text-2xl"
            />
            <img
              src={searchLogo}
              alt="Search logo"
              className="relative object-contain right-28 h-[3.25rem] md:h-[6.75rem]"
            />
          </div>

          
        </div> */}

     
          {/* <img src={leaveImage} alt="Leave image" className="absolute object-cover" style={{ top: '174px',
            left: '970.5px', width: '214px',
           transform: 'rotate(0deg)',
            height: '239px',}} /> */}
             {/* <div className="flex flex-row py-8">
                <div className="w-3/4 px-12">
                    <h1 className="bg-gradient-to-r from-[#FF8100] to-[#FFBE71] bg-clip-text text-transparent text-9xl font-bold py-6">
                            Order Us
                    </h1>
                    <p className="w-3/4 text-2xl" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without.
                    </p>

                    <div className="flex flex-row items-center mt-4">
                    <input
                        type="search"
                        placeholder="Search"
                        className="w-3/4 p-12 rounded-full outline-none 
                                h-[3.5625rem] md:h-[7.375rem] 
                                placeholder:text-lg md:placeholder:text-2xl text-2xl"
                    />
                    <img
                        src={searchLogo}
                        alt="Search logo"
                        className="relative object-contain right-28 h-[3.25rem] md:h-[6.75rem]"
                    />
                    </div>
                </div>

                <div className="relative w-1/4">
                    <img src={orderUsImage} alt="Pizza" />
                    <img src={leaveImage} alt="Leave image" className="absolute top-[-5px] right-48" />
                </div>
              </div> */}
        </div>
    </div>
  )
}

export default SearchAndOrder