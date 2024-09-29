import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import AuthPage from "./pages/auth/AuthPage"
import Register from "./components/auth/Register/Register"
import OrderDetail from "./pages/Order/OrderDetail"
import OrderHistory from "./pages/Order/OrderHistory"
import AdminRegistration from "./components/auth/Admin/AdminRegistration"
import DashBoard from "./pages/DashBoard/DashBoard"
import MyTable from "./components/MyDataTable/MyDataTable"


function App() {

  return (
    <>
      <Router>
         <Routes>
             <Route path="/" element={<Home/>} />
             <Route path="/login" element={<AuthPage/>} />
             <Route path="/register" element={<Register/>} />
             <Route path="/order" element={<OrderDetail />} />
             <Route path="/order/:id" element={<OrderHistory />} />
             <Route path="/admin_register" element={<AdminRegistration />} />
             <Route path="/dashboard" element={<DashBoard />} />
             <Route path="/table" element={<MyTable />} />
         </Routes>
      </Router>
    </>
  )
}

export default App
