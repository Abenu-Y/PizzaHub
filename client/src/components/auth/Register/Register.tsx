
import pizzaImg1 from '../../../assets/image/emojione_pizza.png'
import pizzaImg2 from '../../../assets/image/emojione_p.png'
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import {Link} from 'react-router-dom'

const Register = () => {
  return (
    <div className="min-h-screen">
        <div className="flex">
               <div className="bg-[#FF9921] hidden flex-1 md:flex flex-col justify-center min-h-screen items-center">
                       <img src={pizzaImg2}  alt="pizza" />
               </div>

              
               <div className="flex-1 flex flex-col justify-center items-center mx-auto h-screen px-8">
                    

                           <form className='flex flex-col gap-4 max-w-[552px] w-full'>
                                  <div className='flex gap-2 items-center py-8'>
                                      <img src={pizzaImg1} alt="" />
                                      <span className='text-[#AF5901] text-[20px] font-medium'>Pizza</span>
                                  </div>

                                  <div >
                                       <TextField
                                            required
                                            type='email'
                                            id="outlined-helperText"
                                            label="Email Address"
                                            defaultValue="john@gmail.com"
                                            fullWidth
                                          />
                                  </div>

                                  <div >
                                       <TextField
                                            id="outlined-helperText"
                                            label="Password"
                                            type='password'
                                            defaultValue="*********"
                                            fullWidth
                                          />
                                  </div>

                                  <div >
                                       <TextField
                                            id="outlined-helperText"
                                            label="Confirm Password"
                                            type='password'
                                            defaultValue="*********"
                                            fullWidth
                                          />
                                  </div>


                                  <div className={""}>
                                       <TextField
                                            id="outlined-helperText"
                                            label="Location"
                                            defaultValue="Addis Ababa"
                                            fullWidth
                                          />
                                  </div>

                                  <div >
                                       <TextField
                                            id="outlined-helperText"
                                            label="Phone Number"
                                            defaultValue="0911555555"
                                            fullWidth
                                          />
                                  </div>

                                  <div>
                                      <FormControlLabel  control={<Checkbox />} label="I accept the Terms and Conditions" />
                                  </div>

                                  <Button 
                                          variant="contained" 
                                          type="submit" 
                                          sx={{ backgroundColor: '#FF9921', color: 'white' }} 
                                        >
                                          SIGN UP
                                </Button>

                                <div className='text-center flex gap-3 justify-center'>
                                     <span>Already have an account ?</span>
                                     <Link to="/login" className='text-[#FF9921]'>Login</Link>
                                </div>
                      


                                  
                           </form>

         

                   
               </div>
        </div>
    </div>
  )
}

export default Register