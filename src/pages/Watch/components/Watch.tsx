import React, { FC, useEffect, useState, useRef } from "react";
import ReactPlayer from 'react-player';
import { useParams } from "react-router-dom";
import VideoService from "../../../services/videoService";
import { IVideo } from "../../../interfaces/Video";
import { useAppSelector } from "../../../hooks/redux";
import {IUser} from "../../../interfaces/User";
import UserService from "../../../services/userService";
import "./Watch.css";
import videoService from "../../../services/videoService";


const Watch: FC = () => {
    
    return (
        <div className="watch_background">
            <div className="watch_player">
            <ReactPlayer
            url={`http:localhost:8000/watch/`}
            />
            </div>
            <div className="watch_recommended">
                
            </div>
        </div>
    )
}

export default Watch;