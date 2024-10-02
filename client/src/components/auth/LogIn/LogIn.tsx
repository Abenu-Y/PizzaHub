
import { Alert, Button, Checkbox, Divider, FormControlLabel, List, TextField } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import pizzaImg1 from '../../../assets/image/emojione_pizza.png';
import pizzaImg2 from '../../../assets/image/emojione_p.png';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginformData } from '../../../utils/validation/type';
import { loginSchema } from '../../../utils/validation/validation';
import loginService from '../../../services/auth.service'
import { useState } from 'react';

const LogIn = () => {
  // Get the "redirectTo" and other state (like itemCount) from the location state
  const navigate = useNavigate()
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || '/';
  const itemCount = location.state?.itemCount || 1;
  const [serverError, setServerError] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm<loginformData>({ resolver: zodResolver(loginSchema) });
  
  const handleLogin = async(data: loginformData) => {
    console.log("form data", data)
    try {
      const response = await loginService.logIn(data)
      console.log("1",response,response.data)
      if(response.status === 200 && response.data.token){
        localStorage.setItem("info", JSON.stringify(response.data));
        // Redirect back to the original page (or default)
           navigate(redirectTo, { state: { itemCount } });
      }else{
        setServerError(response.message);
      }
    } catch (error) {
        setServerError(()=>'Internal Server Error')
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="bg-[#FF9921] hidden w-full md:w-1/2 md:flex flex-col justify-center items-center">
        <img src={pizzaImg2} alt="pizza" />
      </div>
      <div className="flex flex-col items-center justify-center w-full h-screen px-8 mx-auto md:w-1/2">
        <form className="flex flex-col gap-4 max-w-[552px] w-full" onSubmit={handleSubmit(handleLogin)}>
          <div className='flex items-center gap-2'>
            <img src={pizzaImg1} alt="" />
            <span className='text-[#AF5901] text-[20px] font-medium'>Pizza</span>
          </div>
          <div className='max-h-[73px] py-[16px]'>
            <div className='text-[24px]'>Login</div>
            {
              serverError && <div className='text-red-500'>{serverError}</div>
            }
            <List sx={{ width: '100%', maxWidth: 552, bgcolor: 'background.paper' }} aria-label="mailbox folders">
              <Divider component="li" />
            </List>
          </div>
          <div>
            <TextField
              required
              type='email'
              label="Email Address"
              // defaultValue="john@gmail.com"
              fullWidth
              {...register("email")}
            />
            {errors.email && <Alert severity='error'>{errors.email.message}</Alert>}
          </div>
          <div>
            <TextField
              label="Password"
              type='password'
              // defaultValue="*********"
              fullWidth
              {...register("password")}
            />
            {errors.password && <Alert severity='error'>{errors.password.message}</Alert>}
          </div>
          <div>
            <FormControlLabel control={<Checkbox {...register("rememberMe")} />} label="Remember Me" />
            {errors.rememberMe && <Alert severity='error'>{errors.rememberMe.message}</Alert>}
          </div>
          <Button variant="contained" type="submit" sx={{ backgroundColor: '#FF9921', color: 'white' }}>LOGIN</Button>
          <div className='flex justify-center gap-3 text-center'>
            <span>Haven't an account?</span>
            <Link to="/register" className='text-[#FF9921]'>Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
