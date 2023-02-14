import React, { FC, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Avatar from "../../../assets/avatar.png";
import Header from "../../../shared/Header/index";
import authService from "../../../services/authService";
import { IUser } from "../../../interfaces/User";
import "./Profile.css";
import { IVideo } from "../../../interfaces/Video";
import videoService from "../../../services/videoService";
import { useAppSelector } from "../../../hooks/redux";
import VideoCard from "../../../shared/VideoCard";
import UploadVideo from "./UploadVideo";




const Profile: FC<any> = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const [videos, setVideos] = useState<IVideo[] | null>(null);


    return(
        <div className="profile_background">
            <Header/>
                <div className="account_title">
                <h1>Hello, {user?.user_email}</h1>
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
                        <label>Nickname : </label>
                        <div id="user_name">{user?.user_email}</div>
                        </div>
                        
                    </div>
                </div>
                <div className="profile_account_info_right">
                <div className="profile_account_info_right_header">
                    <button className="profile_account_info_right_header_button">Connect</button>
                    <img className="profile_account_avatar" src={ user?.avatar || Avatar}></img>
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
                    <div className="profile_account_videos_header">
                        <label className="profile_account_videos_header_label">Videos</label>
                        <form>
                        <UploadVideo setVideos={setVideos} videos={videos || []}/>
                        </form>
                            </div>
                    <div className="video_list_container">
                    {videos && videos.map(video => {
                        return (
                            <div key={video.id}>
                               <VideoCard
                                videos = {videos}
                                setVideos = {setVideos}
                                title = {video.title}
                                id= {video.id}/> 
                            </div>
                        )})
                    }
                    </div>
                </div>    
            </div>
        </div>
    )
}

export default Profile;