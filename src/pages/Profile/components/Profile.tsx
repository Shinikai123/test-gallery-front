import React, { FC, useState } from "react";
import Avatar from "../../../assets/avatar.png";
import Header from "../../../shared/Header/index";
import { IUser } from "../../../interfaces/User";
import UploadAvatar from "./UploadAvatar";
import "./Profile.css";
import "./UploadAvatar.css";
import VideoList from "./VideoList";
import { useAppSelector } from "../../../hooks/redux";

const Profile: FC<any> = () => {
   
    const [user, setUser] = useState<IUser | null>(null);
    const {user_name, user_email, avatar} = useAppSelector(
        (state) => state.auth.user
    )
    return(
        <div className="profile_background">
            <Header/>
                <div className="account_title">
                <h1>Hello, {user_name}</h1>
                <p>This is your profile page. Here you can check the info about you, add videos and set the access for other users.</p>
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
                        <label>Nickname : <div id="user_name">{user_name}</div></label>
                        
                        </div>
                        
                    </div>
                </div>
                <div className="profile_account_info_right">
                <div className="profile_account_info_right_header">
                    {/* <UploadAvatar/> */}
                    <img className="profile_account_avatar" src={user?.avatar || Avatar}></img>
                    <button className="profile_account_info_right_header_button">Give an Access</button>
                </div>
                    <div className="profile_account_info_right_content">
                        <div className="friends_info">
                            <label>22</label>
                            <p>Friends</p>
                        </div>
                        <div className="account_video">
                            <label>8</label>
                            <p>Videos</p>
                        </div>
                    </div>
                </div>
                <div className="profile_account_videos">
                <VideoList/>
                </div>    
            </div>
        </div>
    )
}

export default Profile;