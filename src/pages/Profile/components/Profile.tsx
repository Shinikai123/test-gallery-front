import { Link } from "react-router-dom";
import Logo from "../../../assets/Logo.png";
import Title from "../../../assets/Title.png";
import Search from '../../../assets/search.png';
import Avatar from "../../../assets/avatar.png";
import Header from "../../../shared/Header/index";
import "./Profile.css";
import { useEffect } from "react";

const Profile = () => {

    return(
        <div className="profile_background">
            <Header/>
                <div className="account_title">
                <p>Title</p>
                <p>description</p>
            </div>
            
            

            <div className="profile_account">
                <div className="profile_account_info_left">
                    <div className="profile_account_info_left_header">
                        <p className="profile_account_info_left_header_title">My account</p>
                        <button className="profile_account_info_left_header_button">Edit Profile</button>
                    </div>
                    <div className="profile_account_info_left_content">
                        <p>User Information</p>
                        <div className="profile_account_info_left_search_string">
                        <label>Nickname</label>
                        <input id="user_name"type="text" ></input>
                        </div>
                        <div className="profile_account_info_left_search_string">
                        <label>Email</label>
                        <input id="user_email" type="text" ></input>
                        </div>
                    </div>
                </div>
                <div className="profile_account_info_right">
                <div className="profile_account_info_right_header">
                    <button className="profile_account_info_right_header_button">Connect</button>
                    <img className="profile_account_avatar" src={Avatar}></img>
                    <button className="profile_account_info_right_header_button">Give an Access</button>
                </div>
                    <div className="profile_account_info_right_content">
                        <div className="friends_info">
                            <label>22</label>
                            <p>Friends</p>
                        </div>
                        <div className="friends_video">
                            <label>8</label>
                            <p>Videos</p>
                        </div>
                    </div>
                </div>
                <div className="profile_account_videos">
                    Videos
                </div>
                
            </div>
        </div>
    )
}

export default Profile;