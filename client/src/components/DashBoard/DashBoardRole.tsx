
import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable, MRT_ToggleDensePaddingButton, MRT_ToggleFullScreenButton ,MRT_ToggleFiltersButton,MRT_ShowHideColumnsButton } from 'material-react-table';
import { Button, Box,  Switch, } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddRoleModal from '../Modal/AddRoleModal';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { useLocation } from 'react-router-dom';
import dashboardRoleService from '../../services/dashboardRole.service';
import { useAuth } from '../../context/authContext';

// Define the data type for your table
interface User {
  role_name: string;
  created_at: string;
  actions: {
    isActive: boolean;
    id: number; 
  };
}

const DashBoardRole: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation()
  const [rolesData, setRolesData] = useState<User[]>([])
  const user = useAuth();
  const storedInfo = localStorage.getItem('info');
  const userInfo= storedInfo ? JSON.parse(storedInfo) : {};
  const token = user.user?.token || userInfo?.token
  console.log(user)
  
  const [data, setData] = useState<User[]>([
    {
      role_name: 'Kitchen Manager',
      created_at: '8/14/24',
      actions: { isActive: true, id: 1 },
    },
    {
      role_name: 'Cashier',
      created_at: '8/14/24',
      actions: { isActive: false, id: 2 },
    },
    {
      role_name: 'Branch Manager',
      created_at: '8/14/24',
      actions: { isActive: false, id: 3 },
    },
  ]);

  const fetchRoles = async()=>{
     try {
         
       const response = await dashboardRoleService.fetchRoles(token);
       console.log(response)

       if(response?.status === 200){
          //  setData()
          console.log(response)
          const dataroles = response.data.map((role:any,index:number)=>{
            return{
              role_name: role.name,
              created_at:new Date(role.created_at).toLocaleString(),
              actions:{
                 isActive:!role.deleted_at,
                 id:index
              }
            }
          })

          setRolesData(dataroles)
          setData(dataroles)

          console.log(dataroles)
       }
     } catch (error) {
         console.log(error)
     }
  }


  console.log(rolesData)
  useEffect(()=>{
    fetchRoles();
  },[location.state])
  
  // Handle closing the modal
  const handleClose = () => {
    setOpen(false);
  };


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

  // Handle the deletion of a user
  const handleDeleteUser = (id: number) => {
    setData((prevData) => prevData.filter((user) => user.actions.id !== id));
  };

  // Define the columns using useMemo for performance
  const columns = useMemo<MRT_ColumnDef<User>[]>(() => [
    {
      accessorKey: 'role_name',
      header: 'Role Name',
    },
    {
      accessorKey: 'created_at',
      header: 'Created at',
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      Cell: ({ cell }) => {
        const { isActive, id } = cell.getValue() as { isActive: boolean; id: number };
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            Active
            <Switch
              checked={isActive}
              onChange={() => handleToggleActive(id)}
              color="primary"
            />
            <Button onClick={() => handleDeleteUser(id)}  size="small">
              <VisibilityRoundedIcon fontSize="small" sx={{color:"black"}}/>
            </Button>
            <Button onClick={() => handleDeleteUser(id)} color="error" size="small">
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
    // enableRowSelection: true,
 
    enableBottomToolbar:false,
    enableSorting:false,
    enableFilters:true,
    enableColumnActions:false,
    enableColumnFilters:false,
    enableFilterMatchHighlighting:false,
    positionToolbarAlertBanner: 'bottom', // Show selected rows count on bottom toolbar
    // Add custom action buttons to top-left of top toolbar
    renderTopToolbarCustomActions: ({ table }) => (
      <Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
        <Button
           sx={{background:"#FF8100" }}
          onClick={() => {
            setOpen(!open);
          }}
          variant="contained"
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
            <MaterialReactTable table={table} />)
            <AddRoleModal open={open}  onClose={handleClose} />
    </>
    )
};

export default DashBoardRole;
