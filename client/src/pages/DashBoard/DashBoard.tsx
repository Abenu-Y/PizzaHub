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
        
        <div className="w-[1142px] mx-auto relative top-[87px]" style={{boxShadow: "0px 0px 15px 0px #0000000D"}}>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Topping</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Customer No.</TableCell>
            <TableCell align="right">Created at</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
      </div>

    </div>
  )
}

export default DashBoard