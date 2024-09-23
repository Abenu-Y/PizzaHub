import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import AuthPage from "./pages/auth/AuthPage"



function App() {

  return (
    <>
      <Router>
         <Routes>
             <Route path="/" element={<Home/>} />
             <Route path="/auth" element={<AuthPage/>} />
         </Routes>
      </Router>
    </>
  )
}

export default App
