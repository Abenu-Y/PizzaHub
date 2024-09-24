import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import AuthPage from "./pages/auth/AuthPage"
import Register from "./components/auth/Register/Register"
import OrderDetail from "./pages/Order/OrderDetail"
import OrderHistory from "./pages/Order/OrderHistory"


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
         </Routes>
      </Router>
    </>
  )
}

export default App
