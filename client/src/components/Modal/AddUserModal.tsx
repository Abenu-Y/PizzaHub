import React from 'react';
import { Dialog,DialogContent, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddUserModal: React.FC<CustomDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <div
        className="relative flex flex-col items-center justify-center mx-auto bg-white rounded-20"
        style={{
          width: '654px',
          height: '584px',
        }}
      >
        <DialogContent >
          <div
            className="flex flex-col items-center justify-center mx-auto"
            style={{
              width: '554px',
              height: '484px',
              gap: '0px',
            }}
          >
            <TextField type="text" id="name" label="Name" fullWidth margin="normal" />

            <TextField type="email" id="email" label="Email Address" fullWidth margin="normal" />

            <TextField type="text" id="location" label="Location" fullWidth margin="normal" />

            <TextField type="tel" id="phone" label="Phone Number" fullWidth margin="normal" />

            <TextField type="tel" id="phone" label="Phone Number" fullWidth margin="normal"  />

            <div className="flex items-center justify-between w-full mt-6">
              <FormControl variant="outlined" style={{ width: '223px', height: '56px'}}>
                <InputLabel id="select-role-label">Select Role</InputLabel>
                <Select
                  labelId="select-role-label"
                  id="select-role"
                  label="Select Role"
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="manager">Manager</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="contained"
                style={{
                  width: '231px',
                  height: '56px',
                  padding: '10px 20px',
                  borderRadius: '5px 0px 0px 0px',
                  background:"#FF8100"
                }}
              >
                Add
              </Button>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default AddUserModal;
