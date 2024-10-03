import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import AuthPage from "./pages/auth/AuthPage"
import Register from "./components/auth/Register/Register"
import OrderDetail from "./pages/Order/OrderDetail"
import OrderHistory from "./pages/Order/OrderHistory"
import AdminRegistration from "./components/auth/Admin/AdminRegistration"
import DashBoard from "./pages/DashBoard/DashBoard"
// import ErrorComponent from "./pages/NotFound/NotFound"
import NotFound from "./pages/NotFound/NotFound"
import AboutUs from "./components/about/About"


function App() {

  return (
    <>
      {/* <Router> */}
         <Routes>
             <Route path="/" element={<Home/>} />
             <Route path="/about" element={<AboutUs/>} />
             <Route path="/login" element={<AuthPage/>} />
             <Route path="/register" element={<Register/>} />
             <Route path="/order/:id" element={<OrderDetail />} />
             <Route path="/order-history/:id" element={<OrderHistory />} />
             <Route path="/admin_register" element={<AdminRegistration />} />
             <Route path="/dashboard" element={<DashBoard />} />
             <Route path="*" element={<NotFound />} />
         </Routes>
      {/* </Router> */}
    </>
  )
}

export default App
