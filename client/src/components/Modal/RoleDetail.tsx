import { Dialog, Tooltip } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'; // Import Cancel icon
import { User } from '../../utils/validation/type';

interface RoleDetailModalProps {
  open: boolean;
  onClose: () => void;
  role: User; 
}

const RoleDetailModal: React.FC<RoleDetailModalProps> = ({ open, onClose, role }: RoleDetailModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" >
      <div
        className="relative bg-white rounded-lg p-6 shadow-lg mx-auto w-[80%] lg:w-[800px]"
      >
        <Tooltip title="Close">
          <div
            onClick={onClose}
            className="absolute transition-all cursor-pointer top-3 right-3 hover:text-red-500"
          >
            <HighlightOffOutlinedIcon sx={{ fontSize: '30px', color: '#666' }} />
          </div>
        </Tooltip>

        <div className="flex flex-col items-center gap-6">
          <h2 className="text-2xl font-bold text-gray-800">Role Detail</h2>

          <div className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 rounded-lg">
            <span className="font-semibold text-gray-700">Role:</span>
            <span className="text-gray-900">{role.role_name}</span>
          </div>

          {/* Table for Role Actions */}
          <div className="w-full overflow-x-auto">
            <table className="w-full border border-collapse border-gray-300 rounded-lg table-auto">
              <thead className="text-gray-700 bg-gray-200">
                <tr>
                  <th className="p-3 border border-gray-300">ID</th>
                  <th className="p-3 border border-gray-300">Action</th>
                  <th className="p-3 border border-gray-300">Resource</th>
                </tr>
              </thead>
              <tbody>
                {role.role.map((rol, idx) => (
                  <tr key={idx} className="text-center transition-colors hover:bg-gray-100">
                    <td className="p-3 text-gray-600 border border-gray-300">{idx + 1}</td>
                    <td className="p-3 text-gray-700 border border-gray-300">{rol.action}</td>
                    <td className="p-3 text-gray-700 border border-gray-300">{rol.resource}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default RoleDetailModal;
