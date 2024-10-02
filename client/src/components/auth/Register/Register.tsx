
import pizzaImg1 from '../../../assets/image/emojione_pizza.png';
import pizzaImg2 from '../../../assets/image/emojione_p.png';
import { Alert, Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formData } from '../../../utils/validation/type';
import { registerSchema } from '../../../utils/validation/validation';
import authService from '../../../services/auth.service';


const Register = () => {
  const location = useLocation();
  const path = location.pathname;
  const navigation = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<formData>({
    resolver: zodResolver(registerSchema)
  });

  const handleRegister = async (data: formData) =>{
     console.log("form data", data)
    try {
        const response = await authService.register(data);
        console.log("first")
        if(response.status === 201){
          console.log("register success")
          navigation('/login')
        }
    } catch (error) {
       console.error(error)
    }
    
    };

  return (
    <div className="flex min-h-screen">
      <div className="bg-[#FF9921] hidden md:flex flex-1 justify-center items-center">
        <img src={pizzaImg2} alt="pizza" />
      </div>
      <div className="flex flex-col items-center justify-center flex-1 h-screen px-8">
        <form className="flex flex-col gap-4 max-w-[552px] w-full" onSubmit={handleSubmit(handleRegister)}>
          <div className="flex items-center gap-2 py-8">
            <img src={pizzaImg1} alt="pizza" />
            <span className="text-[#AF5901] text-[20px] font-medium">Pizza</span>
          </div>
          {path === '/' && <TextField required label="Admin Name" defaultValue="Super Admin" fullWidth />}
          <TextField required label="Email Address" {...register("email")} fullWidth  />
          {errors.email && <Alert severity="error">{errors.email.message}</Alert>}
          <TextField required label="Password" {...register("password")} type="password" />
          {errors.password && <Alert severity="error">{errors.password.message}</Alert>}
          <TextField required label="Confirm Password" {...register("confirmPassword")} type="password"  />
          {errors.confirmPassword && <Alert severity="error">{errors.confirmPassword.message}</Alert>}
          <TextField required label="Location" {...register("location")} fullWidth />
          {errors.location && <Alert severity="error">{errors.location.message}</Alert>}
          <TextField required label="Phone Number" {...register("phoneNumber")} fullWidth  />
          {errors.phoneNumber&& <Alert severity="error">{errors.phoneNumber.message}</Alert>}
          <FormControlLabel control={<Checkbox {...register("agreeToTerms")} />} label="I accept the Terms and Conditions" />
          {errors.agreeToTerms && <Alert severity="error">{errors.agreeToTerms.message}</Alert>}
          <Button variant="contained" type="submit" sx={{ backgroundColor: '#FF9921', color: 'white' }}>SIGN UP</Button>
          <div className="flex justify-center gap-3">
            <span>Already have an account?</span>
            <Link to="/login" className="text-[#FF9921]">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
