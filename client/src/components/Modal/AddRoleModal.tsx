import React, { FormEvent, useState } from 'react';
import { Dialog, DialogContent, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import { useAuth } from '../../context/authContext';
import dashboardRoleService from '../../services/dashboardRole.service';
import ConfirmationDialog from './ConfirmationDialog';
import { addRole } from '../../utils/validation/type';

interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddRoleModal: React.FC<CustomDialogProps> = ({ open, onClose }) => {
  const { user } = useAuth();
  const storedInfo = localStorage.getItem('info');
  const userInfo = storedInfo ? JSON.parse(storedInfo) : {};
  const token = user?.token || userInfo?.token;
  // console.log(user)
  
  const [isRoleAdded, setIsRoleAdded] = useState<boolean>(false);
  const [error, setError] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<any[]>([]);
  const [roleName, setRoleName] = useState('');

  const roles = [
    { label: 'Update Order Status', value: { resource: 'order status', action: 'update' } },
    { label: 'See Customers', value: { resource: 'customers', action: 'read' } },
    { label: 'Create Roles', value: { resource: 'role', action: 'create' } },
    { label: 'See Orders', value: { resource: 'order', action: 'read' } },
    { label: 'Add User', value: { resource: 'user', action: 'create' } },
  ];

  const handleADDRole = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const restaurantId = user?.restaurantId[0]?.restaurant_id  || 0;
    const roleData:addRole = { name: roleName, permissions: selectedPermissions ,restaurantId};

    try {
      const response = await dashboardRoleService.addRoles(roleData, token);
      console.log(response);
      if (response?.status === 200 || response?.status === 201) {
        setIsRoleAdded(true);
        setTimeout(() => window.location.reload(), 3000);
      } else {
        setError("Try AGAIN.");
      }
    } catch (error) {
      console.error(error);
      setError('INTERNAL SERVER ERROR');
    }

    // console.log(roleData);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="lg">
        <div className="relative flex flex-col items-center justify-center mx-auto bg-white rounded-[20px]"
          style={{ width: '654px', height: '584px' }}>
          <DialogContent>
            <div className="flex flex-col justify-center mx-auto" style={{ width: '554px', height: '484px' }}>
              <form onSubmit={
                handleADDRole}>
                <div className="flex justify-center mb-4">
                  <h2 className="text-lg font-medium">Role</h2>
                </div>
                {error && <div className='text-center text-red-500'>{error}</div>}

                <TextField
                  type="text"
                  id="name"
                  label="Name"
                  fullWidth
                  margin="normal"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                />

                <div className="flex flex-col mb-8">
                  <div className="text-2xl text-[#00000080] leading-8 mb-2">Permissions</div>
                  <div className="grid grid-cols-2 gap-2 pl-4">
                    {roles.map((role, idx) => (
                      <FormControlLabel
                        key={idx}
                        control={
                          <Checkbox
                            checked={selectedPermissions.some(perm => perm.resource === role.value.resource && perm.action === role.value.action)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedPermissions(prev => [...prev, role.value]);
                              } else {
                                setSelectedPermissions(prev =>
                                  prev.filter(perm => !(perm.resource === role.value.resource && perm.action === role.value.action))
                                );
                              }
                            }}
                            sx={{ color: '#FF9921' }}
                          />
                        }
                        label={role.label}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-center mx-auto">
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      backgroundColor: '#FF9921', color: 'white', width: '321px',
                      height: '54px', borderRadius: '15px', marginInline: 'auto',
                    }}
                  >
                    Update
                  </Button>
                </div>
              </form>
            </div>
          </DialogContent>
        </div>
      </Dialog>

      {
        isRoleAdded &&(
          <ConfirmationDialog message ={`You have succesfully added role ${roleName}`}  handleClose={onClose} open={open} />
        )
      }
    </>
  );
};

export default AddRoleModal;
