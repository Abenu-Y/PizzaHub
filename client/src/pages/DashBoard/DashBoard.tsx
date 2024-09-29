import DashBoardSideBar from "../../components/DashBoard/DashBoardSideBar"
import profileIcon from '../../assets/image/profile.png'
import bellIcon from '../../assets/image/bell.png'
import DashBoardOrder from "../../components/DashBoard/DashBoardOrder";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DashBoardUser from "../../components/DashBoard/DashBoardUser";
import DashBoardRole from "../../components/DashBoard/DashBoardRole";
import DashAddMenu from "../../components/DashBoard/DashAddMenu";

const DashBoard = () => {
  
  const location = useLocation()
  const [tab,seTab]=useState('')

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if(tabFromUrl){
      seTab(tabFromUrl)
    }
   
  },[location.search])
  
  return (
    <div className='flex flex-col mx-auto md:flex-row'>
    {/* sidebar */} 
      <div className=''>
              <DashBoardSideBar />
      </div>

      <div   className=" w-[1182px] mx-auto flex flex-col">
        <div className="flex flex-row items-center justify-between h-[64px] px-8" style={{ boxShadow: '7px 0px 15px 0px #0000000D',borderLeft: '1px solid #0000000D'}} >
               <div>
                   {tab.toUpperCase()}
               </div>

               <div className="flex flex-row gap-8">
                    <div>
                        <img src={bellIcon} alt="Notification-icon" />
                    </div>

                    <div>
                        <img src={profileIcon} alt="profile icon" />
                    </div>
               </div>
        </div>
        
        <div className="w-[1142px] mx-auto relative h-screen top-[20px]" style={{boxShadow: "0px 0px 15px 0px #0000000D"}}>
               
              {
                  (tab === 'orders' || tab ===' ') && <DashBoardOrder />
              }

              {
                tab == 'user' && <DashBoardUser />
              }

              {
                tab === 'role' && <DashBoardRole />
              }

              {
                tab === 'menu' && <DashAddMenu />
              }

        </div>
        
      </div>

    </div>
  )
}

export default DashBoard