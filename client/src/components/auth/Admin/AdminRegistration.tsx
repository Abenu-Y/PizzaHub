
import { Button,  Divider, List, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import pizzaImg1 from '../../../assets/image/emojione_pizza.png';
import pizzaImg2 from '../../../assets/image/emojione_p.png';

const AdminRegistration = () => {
  return (
    <div className="min-h-screen">
      <div className="flex">
        <div className="bg-[#FF9921] hidden w-full md:w-1/2 md:flex flex-col justify-center min-h-screen items-center">
          <img src={pizzaImg2} alt="pizza" />
        </div>

        <div className="flex flex-col items-center justify-center w-full h-screen px-8 mx-auto md:w-1/2">
          
          <form  className="flex flex-col gap-4 max-w-[552px] w-full" >
            <div className='flex items-center gap-2'>
              <img src={pizzaImg1} alt="" />
              <span className='text-[#AF5901] text-[20px] font-medium'>Pizza</span>
            </div>

            <div className='max-h-[73px] py-[16px] '>
               <div className='text-[24px]'>
                   Add Admin
               </div>
               <List sx={{ width: '100%', maxWidth: 552, bgcolor: 'background.paper' }} aria-label="mailbox folders">
                  <Divider component="li"  />
                </List>
            </div>

            <div>
              <TextField
                required
                type='text'
                id="outlined-helperText"
                label="Admin name"
                defaultValue="john@gmail.com"
                fullWidth
              />
            </div>

            <div>
              <TextField
                required
                type='email'
                id="outlined-helperText"
                label="Email Address"
                defaultValue="john@gmail.com"
                fullWidth
              />
            </div>

            <div>
              <TextField
                required
                type='number'
                id="outlined-helperText"
                label="Phone Number"
                defaultValue="0911555555"
                fullWidth
              />
            </div>

            <div>
              <TextField
                id="outlined-helperText"
                label="Password"
                type='password'
                defaultValue="*********"
                fullWidth
              />
            </div>

            <div>
              <TextField
                required
                type='password'
                id="outlined-helperText"
                label="Confirm Password"
                defaultValue="***********"
                fullWidth
              />
            </div>

            <Button
              variant="contained"
              type="submit"
              sx={{ backgroundColor: '#FF9921', color: 'white' }}
            >
              CONTINUE
            </Button>

        
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminRegistration;
