import Home from "./pages/Home/index";
import Login from "./pages/Login/index";
import Profile from "./pages/Profile/index";
import Signup from "./pages/Signup/index";
import NotFound from "./pages/NotFound/index";
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
      <Route path="/profile" element={<Profile/>}></Route>
      <Route path='*' element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
    
    
  </div>
    
  )
}

export default App;
