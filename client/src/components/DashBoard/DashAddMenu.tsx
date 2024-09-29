import { Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import { useState ,FormEvent} from "react";
import ConfirmationDialog from "../Modal/ConfirmationDialog";
import AddUserModal from "../Modal/AddUserModal";
import OrderDetailModal from "../Modal/OrderDetailModal";
import AddRoleModal from "../Modal/AddRoleModal";

const DashAddMenu = () => {
  const [open, setOpen] = useState(false);
  
  // Handle form submission
  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(true); // Show modal on successful upload
  };

  // Handle closing the modal
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="h-screen">
      <div className="max-w-[1040px] mx-auto relative top-[50px]">
        <form className="flex flex-col gap-4 max-w-[552px] w-full mx-auto" onSubmit={handleSubmit}>
          <div className="pb-6 text-center">
            <span className="text-[#525256] text-2xl font-medium">Add Menu</span>
          </div>

          <TextField type="text" id="name" label="Name" fullWidth />

          <div className="flex flex-col">
            <div className="text-2xl text-[#00000080] leading-8">Topping</div>
            <div className="flex flex-row flex-wrap w-4/5 gap-3">
              {['Mozzarella', 'Tomato', 'Bell Peppers', 'Onions'].map((label, idx) => (
                <FormControlLabel
                  key={idx}
                  control={<Checkbox sx={{ color: '#FF9921' }} defaultChecked={idx === 0} />}
                  label={label}
                />
              ))}
              <FormControlLabel disabled control={<Checkbox />} label="Olives" />
            </div>
          </div>

          <TextField type="number" id="price" label="Price" fullWidth />

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
