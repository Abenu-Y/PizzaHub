
import Carousel from "./Custom"

const FeaturedPizza = () => {
  return (
      <div style={{ background: 'linear-gradient(180deg, rgba(250, 126, 0, 0) 0%, rgba(250, 126, 0, 0.2) 60.5%, rgba(148, 74, 0, 0) 100%)'}}>
          <div className="max-w-[1266px] mx-auto py-12 px-8">
            <h2 className='text-[15px] max-w-[1261px] text-[#00000080] font-semibold md:text-[50px] leading-[22.5px] md:leading-[75px] max-h-[75px] mb-8 pl-6 md:pl-0'>Featured Pizzas</h2>

             <Carousel />
          </div>
      </div>
  )
}

export default FeaturedPizza