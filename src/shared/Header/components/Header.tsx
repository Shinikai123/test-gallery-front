import React, {FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import { logoutUser } from "../../../store/reducers/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Logo.png";
import Title from "../../../assets/Title.png";
import Avatar from "../../../assets/avatar.png"
import SearchString from "./SearchString";
import "./Header.css"
import { IUser } from "../../../interfaces/User";

type Props = {
    items: IUser[];
  };

const Header : FC<Props> = ({items}) => {
    const [user, setUser] = useState<IUser | null>(null);
    const { avatar, id} = useAppSelector((state : any) => state.auth.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>(items);


    useEffect(() => {
        setFilteredUsers(items);
      }, [items]);
    

    const handleLogout =  async () => {
        try{
            localStorage.removeItem('token');
            dispatch(logoutUser());
            navigate("/login");
        } catch (e) {
            console.log(e);
        }
    }

    // const filtered = filteredUsers?.map((item) => (
    //     <div key={item.id}>
    //         <Link to={`/${item.id}/`}></Link>
    //         <img src={item?.avatar ?? Logo}></img>
    //         <p>{item.user_email}</p>
    //     </div>
    // ))

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
                <SearchString
                setFilteredUsers={setFilteredUsers}
                arr={items}/>
                <div>
                    
                </div>
                
                <div className="auth_section">
                <img className="avatar" src={ avatar || Avatar}></img>
                
                <Link onClick={handleLogout}to="/login">
                    <button className="button_log_out">Log out</button>
                </Link>
                <Link to={`/profile/${id}`}>
                    <button className="button_profile"> Profile</button>
                </Link>
                </div>
            </div>
    )
}



export default Header;