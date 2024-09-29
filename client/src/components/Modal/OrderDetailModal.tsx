
import { Button, Dialog, FormLabel } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'; // Import Cancel icon

interface OrderDetailModalProps {
  open: boolean;
  onClose: () => void;
}

const toppings = [
  { name: 'Mozzarella', color: '#FF6F61' },
  { name: 'Pepperoni', color: '#FFB74D' },
  { name: 'Mushrooms', color: '#81C784' },
  { name: 'Onions', color: '#64B5F6' },
];

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <div
        className="relative m-auto bg-white rounded-tl-[20px] p-5"
        style={{
          width: '457px',
          height: '283px',
        }}
      >
        <div
          onClick={onClose}
          className="absolute flex items-center justify-center cursor-pointer top-2 right-2"
        >
          <HighlightOffOutlinedIcon sx={{ fontSize: '30px', color: 'black' }} />
        </div>

        <div
          className="absolute top-[47px] left-[24px] opacity-100 flex flex-col"
          style={{
            width: '409px',
            height: '190px',
            gap: '15px',
          }}
        >
          <div className="flex justify-center" style={{ gap: '20px' }}>
            <h2 className="text-lg font-bold">Order Detail</h2>
          </div>

          <div className="flex gap-[14px]" style={{ width: '409px' }}>
            <span>Names:</span>
            <span>Margherita</span>
          </div>

          <div className="flex gap-[14px]" style={{ width: '409px' }}>
            <FormLabel className="font-bold">Toppings:</FormLabel>
            <div className="flex flex-wrap gap-[14px]" style={{ width: '409px' }}>
              {toppings.map((topping, index) => (
                <Button
                  key={index}
                  variant="contained"
                  className="rounded-full"
                  style={{
                    width: '90px',
                    height: '25px',
                    padding: '2px 10px',
                    borderRadius: '9999px',
                    backgroundColor: topping.color,
                    textTransform: 'none',
                  }}
                >
                  {topping.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3" style={{ width: '409px' }}>
            <span>Quantity:</span>
            <span>3</span>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default OrderDetailModal;
