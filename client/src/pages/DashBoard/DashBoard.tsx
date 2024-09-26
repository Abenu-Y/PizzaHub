import DashBoardSideBar from "../../components/DashBoard/DashBoardSideBar"
import DashBoardTopBar from "../../components/DashBoard/DashBoardTopBar"
import profileIcon from '../../assets/image/profile.png'
import bellIcon from '../../assets/image/bell.png'


import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DashAddMenu from "../../components/DashBoard/DashAddMenu";
import MyTable from "../../components/MyDataTable/MyDataTable"
function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  

const DashBoard = () => {
  return (
    <div className='flex flex-col mx-auto md:flex-row'>
    {/* sidebar */} 
      <div className=''>
              <DashBoardSideBar />
      </div>

      <div   className=" w-[1182px] mx-auto flex flex-col">
        <div className="flex flex-row items-center justify-between h-[64px] px-8" style={{ boxShadow: '7px 0px 15px 0px #0000000D',borderLeft: '1px solid #0000000D'}} >
               <div>
                   Orders
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
        
        <div className="w-[1142px] mx-auto relative top-[20px]" style={{boxShadow: "0px 0px 15px 0px #0000000D"}}>
               
                {/* <DashAddMenu /> */}
               <MyTable />
        </div>
        
      </div>

    </div>
  )
}

export default DashBoard