import React, {FC} from "react";
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import { logoutUser } from "../../../store/reducers/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Logo.png";
import Title from "../../../assets/Title.png";
import Search from '../../../assets/search.png';
import Avatar from "../../../assets/avatar.png"
import "./Header.css"

const Header : FC = () => {
    const {userName, id} = useAppSelector((state : any) => state.auth.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout =  async () => {
        try{
            localStorage.removeItem('token');
            dispatch(logoutUser());
            navigate("/login");
        } catch (e) {
            console.log(e);
        }
    }

    return (
            <div className="header">
                <div className="header_section">
                    <Link to="/">
                    <div className="header_logo">
                        <img  src={Logo}></img>
                    </div>
                    </Link>
                    <Link to="/">
                    <div className="header_title">
                        <img  src={Title}></img>
                    </div>
                    </Link>
                
                </div>
                
                <div >
                    <form className="search_string">
                        <input className="search_string_input" placeholder="Search accounts..."></input>
                        <button className="search_string_button">
                            <img src={Search}></img>
                        </button>
                    </form>
                </div>
                <div className="auth_section">
                <img className="avatar" src={Avatar}></img>
                
                <Link onClick={handleLogout}to="/login">
                    <button className="button_log_out">Log out</button>
                </Link>
                <Link to={`/profile/${id}`}>
                    <button className="button_profile"> {userName}</button>
                </Link>
                </div>
            </div>
    )
}

export default Header;