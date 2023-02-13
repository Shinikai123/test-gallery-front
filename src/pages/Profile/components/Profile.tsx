import React, { FC, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Logo from "../../../assets/Logo.png";
import Title from "../../../assets/Title.png";
import Search from '../../../assets/search.png';
import Avatar from "../../../assets/avatar.png";
import Header from "../../../shared/Header/index";
import authService from "../../../services/authService";
import { IUser } from "../../../interfaces/User";
import "./Profile.css";
import { IVideo } from "../../../interfaces/Video";
import videoService from "../../../services/videoService";
import { useAppSelector } from "../../../hooks/redux";
import VideoCard from "../../../shared/VideoCard";


type Props = {
    setVideos: (video: IVideo[]) => void;
    videos: IVideo[];
};

const UploadVideo: FC<Props> = ({setVideos, videos}) => {
    
    const fileRef = useRef(null);
    const {userId} = useParams();

    const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if(!file.type.includes('video')) {
                return;
            }   else {
                try{
                    const response = await videoService.uploadVideo(userId!, file);
                    setVideos([response, ...videos]);
                } catch (e) {
                    console.log(e)
                }
            }
        }
    };

    return(
        <div>
            <input multiple type="file" accept="video/*" ref={fileRef} onChange={handleVideoUpload}></input>
        </div>
        )

}




const Profile: FC = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const {userId} = useParams();    
    const authUserId = useAppSelector((state) => state.auth.user.id);
    const [videos, setVideos] = useState<IVideo[] | null>(null);

    
    const pageValidation = authUserId === userId;



    const fetchUser = async () => {
        try{
            if(userId) {
                const response = await authService.getUserById(userId.toString());
                setUser(response);
                console.log(response.error);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [userId]);
    console.log(user);


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
                        <label>Nickname :</label>
                        <input id="user_name"type="text" readOnly ></input>
                        </div>
                        <div className="profile_account_info_left_search_string">
                        <label>Email</label>
                        <input id="user_email" type="text" readOnly ></input>
                        </div>
                    </div>
                </div>
                <div className="profile_account_info_right">
                <div className="profile_account_info_right_header">
                    <button className="profile_account_info_right_header_button">Connect</button>
                    <img className="profile_account_avatar" src={ Avatar}></img>
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
                    <div>
                        {pageValidation && (<UploadVideo setVideos={setVideos} videos={videos || []}/>)}
                        </div>
                    </div>
                    {videos && videos.map((video) => (
                        <VideoCard
                        videos = {videos}
                        setVideos = {setVideos}
                        title = {video.title}
                        id= {video.id}
                        />
                    ))}
                </div>
                
                
            </div>
        </div>
    )
}

export default Profile;