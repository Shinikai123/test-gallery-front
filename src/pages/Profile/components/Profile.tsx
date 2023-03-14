import React, { FC, useEffect, useState } from "react";
import Avatar from "../../../assets/avatar.png";
import Header from "../../../shared/Header/index";
import { IUser } from "../../../interfaces/User";
import UploadAvatar from "./UploadAvatar";
import "./Profile.css";
import "./UploadAvatar.css";
import VideoList from "./VideoList";
import { useAppSelector } from "../../../hooks/redux";
import userService from "../../../services/userService";
import EditProfile from "./EditProfile";

type Props ={
    setUsers: ( IUser: IUser[]) => void;
    userId: string;
    isEdit: boolean;
    userName: string;
    setIsEdit: (bool: boolean) => void;
}

const Profile: FC<Props> = ({userId, userName, isEdit, setIsEdit}) => {
    const [users, setUsers] = useState<IUser | null>(null);
    const [userNameValue, setUserNameValue] = useState(userName)
    const {user_name, user_email, avatar} = useAppSelector(
        (state) => state.auth.user
    )

  const handleChangeName = (e) => {
    setUserNameValue(e.target.value)
  }

    console.log(`avatar ${avatar}`)
    
    return(
        <div className="profile_background">
            <Header/>
                <div className="account_title">
                <h1>Hello, {user_name}!</h1>
                <p>This is your profile page. Here you can check the info about you, add videos and set the access for other users.</p>
            </div>
            
            

            <div className="profile_account">
                <div className="profile_account_info_left">
                    <div className="profile_account_info_left_header">
                        <p className="profile_account_info_left_header_title">My account</p>
                        
                    </div>
                    <div className="profile_account_info_left_content">
                        <h3>User Information</h3>
                        {isEdit ? (
                        <div id="user_name" className="profile_account_info_left_string">
                            <p>Nickname :</p>
                            <input value={userNameValue} onChange={handleChangeName}> {user_name}</input>
                        </div>
                        ) : (
                        <div id="user_name" className="profile_account_info_left_string">
                            <p>Nickname :</p>
                            <p> {user_name}</p>
                        </div>
                        )}
                        
                        <div id="user_email" className="profile_account_info_left_string">
                            <p>Email :</p> 
                            <p>{user_email}</p>
                        </div>
                        
                    </div>
                </div>
                <div className="profile_account_info_right">
                <div className="profile_account_info_right_header">
                    <UploadAvatar/>
                    {avatar ? (
                    <img className="profile_account_avatar" src={avatar}></img>
                    ) : (    
                    <img className="profile_account_avatar" src={Avatar}></img>
                    )}
                    <EditProfile
                    users={users}
                    setUSers={setUsers}
                    userId={userId}
                    isEdit={isEdit}
                    userName={userName}
                    setIsEdit={setIsEdit}
                    userNameValue={userNameValue}/>
                    </div>
                    <div className="profile_account_info_right_content">
                        <div className="friends_info">
                            <label>22</label>
                            <p>Friends</p>
                        </div>
                        <div className="video_info">
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