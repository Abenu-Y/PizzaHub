import React from 'react';
import { Dialog, DialogContent, TextField, Button, FormControlLabel, Checkbox,} from '@mui/material';

interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddRoleModal: React.FC<CustomDialogProps> = ({ open, onClose }) => {
  const roles = [ 'Update Order Status','See Customers', 'See Orders', 'Create Roles','Add Users'];
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <div
        className="relative flex flex-col items-center justify-center mx-auto bg-white rounded-[20px]"
        style={{ width: '654px', height: '584px' }}
      >
        <DialogContent>
          <div
            className="flex flex-col justify-center mx-auto"
            style={{ width: '554px', height: '484px' }}
          >
            <form>
              <div className="flex justify-center mb-4">
                <h2 className="text-lg font-medium">Role</h2>
              </div>

              <TextField type="text" id="name" label="Name" fullWidth margin="normal"/>

              <div className="flex flex-col mb-8">
                <div className="text-2xl text-[#00000080] leading-8 mb-2">
                  Permissions
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {roles.map((label, idx) => (
                    <FormControlLabel
                      key={idx}
                      control={
                        <Checkbox
                          sx={{ color: '#FF9921' }}
                          defaultChecked={idx === 0}
                        />
                      }
                      label={label}
                    />
                  ))}
                </div>
              </div>

              <Button
                variant="contained"
                type="submit"
                sx={{ backgroundColor: '#FF9921', color: 'white', width: '321px',
                  height: '54px',
                  borderRadius: '15px',
                  marginInline: 'auto',
                }}
                className="flex items-center"
              >
                Update
              </Button>
            </form>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default AddRoleModal;
