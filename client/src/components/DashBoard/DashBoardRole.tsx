
import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable, MRT_ToggleDensePaddingButton, MRT_ToggleFullScreenButton ,MRT_ToggleFiltersButton,MRT_ShowHideColumnsButton } from 'material-react-table';
import { Button, Box,  Switch, } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddRoleModal from '../Modal/AddRoleModal';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { useLocation } from 'react-router-dom';
import dashboardRoleService from '../../services/dashboardRole.service';
import { useAuth } from '../../context/authContext';
import {User}  from '../../utils/validation/type'
import RoleDetailModal from '../Modal/RoleDetail';


const sample ={ 
  role_name: 'Admin',
  created_at: 'today',
  actions: {
    isActive: false,
    id: 0
  },
  role:[]}

const DashBoardRole: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation()
  const [rolesData, setRolesData] = useState<User>(sample)
  const user = useAuth();
  const storedInfo = localStorage.getItem('info');
  const userInfo= storedInfo ? JSON.parse(storedInfo) : {};
  const token = user.user?.token || userInfo?.token
  const [rolesList , setRolesList] = useState<boolean>(false);
  const [data, setData] = useState<User[]>([]);

  const fetchRoles = async()=>{
     try {
       const response = await dashboardRoleService.fetchRoles(token);
      //  console.log(response)

       if(response?.status === 200){
          //  setData()
          console.log(response)
          const dataroles = response.data.map((role:any,index:number)=>{
            return {
              role_name: role.name,
              created_at:new Date(role.created_at).toLocaleString(),
              actions:{ isActive:!role.deleted_at, id:index },
              role:role.role
            }
          })

          // setRolesData(dataroles)
          setData(dataroles)
       }
     } catch (error) {
         console.log(error)
     }
  }

  useEffect(()=>{
    fetchRoles();
  },[location.state])
  
  // console.log(data)
  console.log(rolesData)
  // Handle closing the modal
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseRoleList = () =>{
    setRolesList(false)
  }

  // Handle the toggle of user status
  const handleToggleActive = (id: number) => {
    setData((prevData) =>
      prevData.map((user) =>
        user.actions.id === id
          ? { ...user, actions: { ...user.actions, isActive: !user.actions.isActive } }
          : user
      )
    );
  };

  //Handle the roles list of the user
 const handleUserRoles = (rol:User) =>{
      setRolesData(rol)
      setRolesList(!rolesList)
 }

//  console.log(rolesList)
  // Handle the deletion of a user
  const handleDeleteUser = (id: number) => {
    setData((prevData) => prevData.filter((user) => user.actions.id !== id));
  };

  // Define the columns using useMemo for performance
  const columns = useMemo<MRT_ColumnDef<User>[]>(() => [
    { accessorKey: 'role_name', header: 'Role Name',},
    { accessorKey: 'created_at', header: 'Created at', },
    { accessorKey: 'actions', header: 'Actions',
      Cell: ({ cell }) => {
        const { isActive, id } = cell.getValue() as { isActive: boolean; id: number };
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className='px-4 py-2 bg-green-100 rounded-full'>
                  <span className='text-green-600'>Active</span>
                  <Switch checked={isActive} color="success" size='small'
                    onChange={() => handleToggleActive(id)}
                  />
              </div>
            <Button onClick={()=>handleUserRoles(cell.row.original)}  size="small">
              <VisibilityRoundedIcon fontSize="small" sx={{color:"black"}}/>
            </Button>
            <Button onClick={() => handleDeleteUser(id)} color='inherit' size="small">
              <DeleteIcon fontSize="small" />
            </Button>
          </div>
        );
      },
    },
  ], []);

  // Set up the table using the hook
  const table = useMaterialReactTable({
    columns,
    data,
    muiTableHeadCellProps: {
      sx: { backgroundColor: '#F6F6F6',paddingBlock:"15px"},
    },
    // enableRowSelection: true,
    enableBottomToolbar:false,
    enableSorting:false,
    enableFilters:true,
    enableColumnActions:false,
    enableColumnFilters:false,
    enableFilterMatchHighlighting:false,
    positionToolbarAlertBanner: 'bottom', // Show selected rows count on bottom toolbar
    // Add custom action buttons to top-left of top toolbar
    renderTopToolbarCustomActions: () => (
      <Box sx={{ display: 'flex', gap: '1rem', p:'4px' }}>
        <Button
           sx={{background:"#FF8100" }} variant="contained" 
           onClick={() => {setOpen(!open) }}
        >
          Add Role
        </Button>
      </Box>
    ),
    // Customize built-in buttons in the top-right of top toolbar
    renderToolbarInternalActions: ({ table }) => (
      <Box>
        <MRT_ToggleFiltersButton table={table} />
        <MRT_ShowHideColumnsButton table={table} />
        <MRT_ToggleDensePaddingButton table={table} />
        <MRT_ToggleFullScreenButton table={table} />
      </Box>
    ),
  });

  return (
    <>
        <MaterialReactTable table={table} />
        <AddRoleModal open={open}  onClose={handleClose} />
        {rolesList && <RoleDetailModal open={rolesList} onClose={handleCloseRoleList} role={rolesData}/>}
    </>
    )
};

export default DashBoardRole;
