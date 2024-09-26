import { Button, Checkbox, Divider, FormControlLabel, List, TextField } from "@mui/material"
import { Link,  useLocation } from "react-router-dom"
import pizzaImg1 from '../../assets/image/emojione_pizza.png'
import pizzaImg2 from '../../assets/image/emojione_p.png'

const DashAddMenu = () => {
    const location = useLocation()
    const path = location.pathname;
  return (
    <div className="h-screen">
             <div className="max-w-[1040px] mx-auto  relative top-[50px]">
                      {/* <form action=""  className="flex flex-col items-center w-[460px]  mx-auto">
                          <div className=''>
                            <div className='text-2xl font-semibold '>
                                Add Admin
                            </div>

                            <div>
                                <TextField
                                    required
                                    type='text'
                                    id="outlined-helperText"
                                    label="Name"
                                    defaultValue=""
                                    fullWidth
                                    sx={{maxWidth:"460px"}}
                                />
                            </div>

                            
              
                           </div>
                      </form> */}
                        <form className='flex flex-col gap-4 max-w-[552px] w-full mx-auto'>
                                  <div className='pb-6 text-center'>
                                      <span className='text-[#525256] text-2xl] font-medium'>Add Admin</span>
                                  </div>
    
                                  <div >
                                       <TextField
                                            type='Name'
                                            id="outlined-helperText"
                                            label="Name"
                                            fullWidth
                                          />
                                  </div>

                                  <div className="flex flex-row flex-wrap w-4/5 gap-6 topping">
                                        <FormControlLabel control={<Checkbox defaultChecked sx={{ color: '#FF9921' }} />} label="Mozzarella" />
                                        <FormControlLabel control={<Checkbox sx={{ color: '#FF9921' }} />} label="Tomato" />
                                        <FormControlLabel control={<Checkbox sx={{ color: '#FF9921' }} />} label="Bell Peppers" />
                                        <FormControlLabel control={<Checkbox sx={{ color: '#FF9921' }} />} label="Onions" />
                                        <FormControlLabel disabled control={<Checkbox />} label="Olives" />
                                 </div>

                                 <div >
                                       <TextField
                                            type='number'
                                            id="outlined-helperText"
                                            label="Pice"
                                            fullWidth
                                          />
                                  </div>


                                  <div className="upload-container">
                                        <input type="file" id="fileUpload" className="hidden" />
                                        <label htmlFor="fileUpload" className="upload-button">
                                            Upload Pizza Image
                                        </label>
                                </div>

                                <Button
                                   variant="contained"
                                   type="submit"
                                    sx={{ backgroundColor: '#FF9921', color: 'white',width:"321px" ,marginInline:"auto" }}
                                >
                                   Submit
                                </Button>



                           </form>
             </div>
    </div>
  )
}

export default DashAddMenu