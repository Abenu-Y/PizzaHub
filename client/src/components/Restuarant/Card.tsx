import { Avatar } from "@mui/material"
import avatarImg from '../../assets/image/Ellipse8.png';
import av_powerImg from '../../assets/image/Group2.png';
import av_2k from '../../assets/image/2k.png';

type Props={
    name:string,
    description:string
}

const Card = ({name, description}:Props) => {

  return (
    <div className="max-w-[298px] max-h-[90px] md:max-w-[574px] md:max-h-[154px] rounded-[10px] md:rounded-[15px] p-[15px] md:px-[31px] md:py-[23px] bg-white  flex shrink-0 flex-row items-center gap-[15px] ">
        
        <div className="max-w-[120px] max-h-[60px] md:max-w-[235px] md:max-h-[108px] rounded-[10px] flex flex-col justify-center gap-[5px] md:gap-[10px]">
            
            <div className=" max-w-[109px] max-h-[25px] md:max-w-[191px] md:max-h-[50px] flex flex-row items-center gap-[5px] md:gap-[10px] ">
               <Avatar alt="Azmera Pizza" src={avatarImg}  className="max-w-[25px] max-h-[25px]  md:max-w-[50px] md:max-h-[50px] " />
               <p className="font-roboto text-[12px]  md:text-[20px] font-bold leading-[11.36px] md:leading-[18.94px] tracking-[0.03em] text-left ,">{name}</p>
            </div>

            <div className="max-w-[120px] h-[30px] md:max-w-[235px] md:max-h-[48px] gap-[10px] font-inter text-[10px] md:text-[15px] font-normal leading-[10.5px]  md:leading-[15.75px] text-left" style={{ fontFamily: 'Inter, sans-serif',color: 'rgba(0, 0, 0, 0.5)'}}>
                   <p>{description}</p>
            </div>
        </div>

        <div className="max-w-[133px] h-[60px] md:max-w-[262px] md:h-[108px] px-[15px] rounded-[10px] flex flex-row items-center gap-[20px] bg-[#0080000D]">
            <div>
                <img src={av_powerImg} alt=""  />
            </div>
            <div className="max-w-[43px] h-[47px]  md:max-w-[132px] md:h-[66px] p">
                     <p className="font-inter text-[8px] md:text-[12px]  flex flex-col gap-[10px] font-normal leading-[11.36px] tracking-[0.03em] text-left">Number of Orders</p>
                     <div className="flex flex-col gap-[10px]">
                        <img src={av_2k} alt="" className="max-w-[39px] max-h-[28px] md:max-w-[64px] md:max-h-[47px]" />
                     </div>
            </div>
        </div>

    </div>
  )
}

export default Card