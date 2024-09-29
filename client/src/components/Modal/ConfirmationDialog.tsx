import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import ErrorIcon from '@mui/icons-material/Error';
// import WarningIcon from '@mui/icons-material/Warning';
// import CancelIcon from '@mui/icons-material/Cancel';

interface ChildComponentProps {
    // setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleClose:() =>void;
    message: string;
    open:boolean;
  }
  

const ConfirmationDialog:React.FC<ChildComponentProps> = ({handleClose,message,open}) => {
  
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
          <div
            className="relative mx-auto bg-white w-[857px] h-[591px] rounded-[20px_0_0_0] flex flex-col items-center justify-center p-[99px_128px_99px_128px]"
          >
            <div className="flex flex-col items-center w-[602px] gap-5">
              <div
                className="flex items-center justify-center bg-green-100 rounded-full w-[281.33px] h-[281.33px]"
              >
                <CheckCircleIcon
                  className="text-green-600"
                  style={{ width: '91.67px', height: '86.11px' }}
                />
              </div>

              <DialogContent>
                <DialogContentText
                  className="text-center"
                  style={{ fontSize: '24px', color: '#05C605' }} // Updated color style
                >
                  {message}
                </DialogContentText>
              </DialogContent>
            </div>
          </div>
        </Dialog>
  )
}

export default ConfirmationDialog