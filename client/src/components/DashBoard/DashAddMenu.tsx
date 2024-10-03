import { Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import { useState ,FormEvent} from "react";
import ConfirmationDialog from "../Modal/ConfirmationDialog";
import { Topping } from "../../utils/validation/type";
import { useAuth } from "../../context/authContext";
import dashboardMenuService from "../../services/dashboardMenu.service";
import { useNavigate } from "react-router-dom";


const  toppings = [
  { label: 'Mozoarella', price:1.00 },
  { label: 'Tomato', price:0.98 },
  { label: 'Bell Peppers', price:1.25 },
  { label: 'Spinach', price:2.00 },
  { label: 'Mushroom', price:0.5 },
  { label: 'Veggie Delights', price:1.2 },
  { label: 'Feta cheese', price:1.5 },
];

const DashAddMenu = () => {
  const [open, setOpen] = useState(false);
  const [pizzaName, setPizzaName] = useState('')
  const [pizzaPrice,setPizzaPrice] =useState('')
  // const [menu,setmMenu] = useState<addMenu>()
  const navigate = useNavigate()
  const [error,setError] = useState('')
  const [topping,setToppings] = useState<Topping[]>([])
  const {user} = useAuth()
  const storedInfo = localStorage.getItem('info');
  const userInfo= storedInfo ? JSON.parse(storedInfo) : {};
  const restaurantId = user?.restaurantId[0]?.restaurant_id;
  const token = user?.token || userInfo?.token
  
  // Handle form submission
  const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     if(!pizzaName || !pizzaName  || !topping.length){
       setError(()=>'Please fill all required values or inputs.')
       return;
     }
    const menuData = {
      pizza:{
        name: pizzaName,
        base_price: pizzaPrice,
        restaurant_id:restaurantId
      },
      toppings: topping,
    };

    try {
      const response = await dashboardMenuService.addMENU(menuData,token);
      if(response.status=== 200 || response.status === 201){
        setOpen(true);
        setTimeout(()=>navigate('/dashboard?tab=menu'),2000)
      } else{
        setError(()=>"You can't the same pizza twice.")
      }
    } catch (error) {
          setError('Server Error.')
         console.error(error)
    }

    console.log(menuData)
    // setOpen(true); // Show modal on successful upload
  };

  // Handle closing the modal
  const handleClose = () => {
    setOpen(false);
  };

  console.log(topping)
  console.log(pizzaName,pizzaPrice)

  return (
    <div className="h-screen">
      <div className="max-w-[1040px] mx-auto relative top-[50px]">
        <form className="flex flex-col gap-4 max-w-[552px] w-full mx-auto" onSubmit={handleSubmit}>
          <div className="pb-6 text-center">
            <span className="text-[#525256] text-2xl font-medium">Add Menu</span>
          </div>
          
          {
              error && (
                   <div className="text-center text-red-500">
                       {error}
                   </div>
              )
          }

          <TextField type="text" id="name" label="Name" fullWidth 
                 value={pizzaName} 
                 onChange={(e) => setPizzaName(e.target.value)} 
          />

          <div className="flex flex-col">
            <div className="text-2xl text-[#00000080] leading-8">Topping</div>
            <div className="flex flex-row flex-wrap w-4/5 gap-3">
              {toppings.map((label, idx) => (
              <FormControlLabel
              key={idx}
              control={
                <Checkbox
                  checked={topping.some(perm => perm.name === label.label)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      // Add the topping to the array if checked
                      setToppings((prev) => [...prev, { name: label.label, price: label.price }]);
                    } else {
                      // Remove the topping if unchecked
                      setToppings((prev) =>
                        prev.filter((perm) => perm.name !== label.label)
                      );
                    }
                  }}
                  sx={{ color: '#FF9921' }} // Custom color for the checkbox
                />
              }
              label={`${label.label} ($${label.price})`} // Display label and price
            />
            
              ))}
              <FormControlLabel disabled control={<Checkbox />} label="Olives" />
            </div>
          </div>

          <TextField type="number" id="price" label="Price" fullWidth 
            value={pizzaPrice} 
            onChange={(e) => setPizzaPrice(e.target.value)} 
          />

          <div className="upload-container">
            <input type="file" id="fileUpload" className="hidden" />
            <label htmlFor="fileUpload" className="upload-button">
              Upload Pizza Image
            </label>
          </div>

          <Button
            variant="contained"
            type="submit"
            sx={{ backgroundColor: '#FF9921', color: 'white', width: "321px", marginInline: "auto", height: "74px", borderRadius: "15px" }}
            className="flex items-center"
          >
            Submit
          </Button>
        </form>

        {/* Success Modal */}
        <ConfirmationDialog handleClose={handleClose} open={open} message=" You have uploaded the pizza successfully!" />
       
        {/* <OrderDetailModal open={open} onClose={() => setOpen(false)} /> */}
        {/* <AddRoleModal  open={open} onClose={handleClose} /> */}

       
      </div>
    </div>
  );
};

export default DashAddMenu;
