import React, {FC} from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import Registration from "../pages/Registration";

const AppRoutes = () => {
    return(
    <div>
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/registration" element={<Registration/>}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
        <Route path='*' element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
      </div>
        
    
    
    )
}
export default AppRoutes;