import React, {FC} from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import Signup from "../pages/Signup";

const AppRoutes = () => {
    return(
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
export default AppRoutes;