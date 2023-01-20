import Home from "./pages/Home/index";
import Login from "./pages/Login/index";
import Profile from "./pages/Profile/index";
import Signup from "./pages/Signup/index";
import Test from "./pages/Login/components/example";
import { Routes, Route, BrowserRouter} from "react-router-dom";
import "./App.css"

function App() {

  return (
  <div>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/test" element={<Test/>}/>
      <Route path="/profile" element={<Profile/>}></Route>
      </Routes>
    </BrowserRouter>
    
    
  </div>
    
  )
}

export default App;
