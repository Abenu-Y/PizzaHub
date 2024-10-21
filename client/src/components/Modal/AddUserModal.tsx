import React, {  useEffect, useState } from 'react';
import { Dialog,DialogContent, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useAuth } from '../../context/authContext';
import dashboardRoleService from '../../services/dashboardRole.service';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addAdmin } from '../../utils/validation/type';
import { addAdminSchema } from '../../utils/validation/validation';
import ConfirmationDialog from './ConfirmationDialog';
import dashboardUserService from '../../services/dashboardUser.service';

interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
}

type Role ={
  roleName:string,
  roleId:number
}

const AddUserModal: React.FC<CustomDialogProps> = ({ open, onClose }) => {
  const user = useAuth();
  const storedInfo = localStorage.getItem('info');
  const userInfo= storedInfo ? JSON.parse(storedInfo) : {};
  const token = user.user?.token || userInfo?.token
  const [selectedRoleId, setSelectedRoleId] = useState('')
  const [error,setError] = useState('')
  const [role,setRole] = useState<Role[]>([])
  const [isUserAdded, SetIsUserAdded] = useState<boolean>(false)
  const location = useLocation()
  

  
  const getRoles = async()=>{
   
    try {

      if (!user.user?.token) {
        console.warn('No token found. User might not be authenticated.');
        return; // Optionally handle user not being logged in
    }
        
      const response = await dashboardRoleService.fetchRoles(token);
      // console.log(response)

      if(response?.status === 200){
         //  setData()
        //  console.log(response)
         const dataroles = response.data.map((role:any,index:number)=>{
          console.log(index)
           return{
             roleId: role.role_id,
             roleName:role.name
           }
         })

         setRole(()=>dataroles)

        //  console.log(dataroles)
      }
    } catch (error) {
        console.log(error)
    }
 }


 const { register, handleSubmit, watch,formState: { errors } } = useForm<addAdmin>({ resolver: zodResolver(addAdminSchema) });
//  console.log(role)
 const watchedValues = watch()

 const handleAddADMIN = async(data:addAdmin):Promise<any> =>{
      // console.log(data,token)  
      try {
            const response = await dashboardUserService.addUser(data, token);
            // console.log(response)
            if(response?.status === 200 ){
              SetIsUserAdded(true)
              setTimeout(()=>window.location.reload(), 3000)
            } else{
               setError("Try AGAIN.")
            }
            
      } catch (error) {
         console.error(error)
         setError('INTERNAL SERVER ERROR')
      }
 }

 useEffect(()=>{
  getRoles()
 },[location.state])

  return (

    <>
    
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <div
        className="relative flex flex-col items-center justify-center mx-auto bg-white rounded-20"
        style={{
          width: '654px',
          height: '584px',
        }}
      >
        {
          error && (
            <div className='text-red-500'>
               {error}
            </div>
            
          )
        }

        {
          errors && (
            <div className='text-red-500'>
               {error}
            </div>
            
          )
        }
        <DialogContent >
          <div
            className="flex flex-col items-center justify-center mx-auto"
            style={{
              width: '554px',
              height: '484px',
              gap: '0px',
            }}
          >
          <form onSubmit={handleSubmit(handleAddADMIN)}>
            <TextField type="text" id="name" label="Name" fullWidth margin="normal" {...register('name')}/>

            <TextField type="email" id="email" label="Email Address" fullWidth margin="normal" {...register('email')} />

            <TextField type="text" id="location" label="Location" fullWidth margin="normal" {...register('location')}/>

            <TextField type="tel" id="phone" label="Phone Number" fullWidth margin="normal" {...register('phoneNumber')} />

            <TextField type="tel" id="password" label="Password" fullWidth margin="normal" {...register('password')} />

            <div className="flex items-center justify-between w-full mt-6">
              <FormControl variant="outlined" style={{ width: '223px', height: '56px'}}>
                <InputLabel id="select-role-label">Select Role</InputLabel>
                <Select
                  labelId="select-role-label"
                  id="select-role"
                  label="Select Role"
                  {...register('role')}  // Register the field for form control
                  value={selectedRoleId} // The current selected value
                  onChange={(e) => setSelectedRoleId(e.target.value)}
                >
                  {/* <MenuItem value="admin">Admin</MenuItem>
                  
                  <MenuItem value="manager">Manager</MenuItem> */}
                  {
                    role && (
                       role.map((r,index)=>(
                         <MenuItem  key={index} value={r?.roleId}>{r?.roleName}</MenuItem>
                       ))
                    )
                  }
                </Select>
              </FormControl>

              <Button
                variant="contained"
                type='submit'
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
            </form>
          </div>
        </DialogContent>
      </div>
    </Dialog>

    {
      isUserAdded && (
        <ConfirmationDialog open={open} handleClose={onClose} message={`You have successfully added the user ${watchedValues.name} with the role of ${watchedValues.role}.`} />
      )

    }
    </>
  );
};

export default AddUserModal;
