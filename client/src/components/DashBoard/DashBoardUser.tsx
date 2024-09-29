
import React, { useMemo, useState } from 'react';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable, MRT_ToggleDensePaddingButton, MRT_ToggleFullScreenButton ,MRT_ToggleFiltersButton,MRT_ShowHideColumnsButton } from 'material-react-table';
import { Button, Box,  Switch, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddUserModal from '../Modal/AddUserModal';

// Define the data type for your table
interface User {
  name: string;
  phoneNo: string;
  email: string;
  actions: {
    isActive: boolean;
    id: number; 
  };
}

const DashBoardUser: React.FC = () => {
  const [open, setOpen] = useState(false);
  
  // Handle closing the modal
  const handleClose = () => {
    setOpen(false);
  };

  const [data, setData] = useState<User[]>([
    {
      name: 'Abebe Bekele',
      phoneNo: '+251 1523654789',
      email: 'thisis@gmail.com',
      actions: { isActive: true, id: 1 },
    },
    {
      name: 'Kebede Alemu',
      phoneNo: '+251 912345678',
      email: 'kebede@gmail.com',
      actions: { isActive: false, id: 2 },
    },
  ]);

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
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'phoneNo',
      header: 'Phone No',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      Cell: ({ cell }) => {
        const { isActive, id } = cell.getValue() as { isActive: boolean; id: number };
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            active
            <Switch
              checked={isActive}
              onChange={() => handleToggleActive(id)}
              color="primary"
            />
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
          Add User
        </Button>
        
      </Box>
    ),
    // Customize built-in buttons in the top-right of top toolbar
    renderToolbarInternalActions: ({ table }) => (
      <Box>
       
        {/* <MRT_FilterFn table={table} /> */}
        {/* <TextField type='search' /> */}
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
            <AddUserModal open={open}  onClose={handleClose} />
    </>
    );
};

export default DashBoardUser;
