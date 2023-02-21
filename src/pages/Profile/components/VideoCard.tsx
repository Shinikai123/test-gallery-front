import React, { FC, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import videoService from "../../../services/videoService";
import { IVideo } from "../../../interfaces/Video";
import { useAppSelector } from "../../../hooks/redux";
import { IUser } from "../../../interfaces/User";
import userService from "../../../services/userService";
import "./VideoCard.css"

type Props = {
  videos: IVideo[];
  setVideos: (iVideo: IVideo[]) => void;
  title: string;
  id: string ;
  titleValue: string;
};

const VideoCard: FC<Props> = ({ title, videos, setVideos, id, titleValue }) => {
  const { userId } = useParams();
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [access, setAccess] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const authUserId = useAppSelector((state) => state.auth.user.id);
  const { token } = useAppSelector((state) => state.auth);

  const handleDeleteVideo = async () => {
    try {
      await videoService.deleteVideo(id!);
      setVideos(videos.filter((video) => video.id !== id));
    } catch (e) {
      console.log(e);
    }
  };

  // const handleEditMovie = async () => {
  //   setIsEdit(true);
  // };

  // const handleSave = async () => {
  //   try{
  //     await videoService.updateVideo(id, titleValue);
  //     const updatedVideos = videos.map((video) => {
  //       return {
  //         ...video,
  //         title: video.id === id ? titleValue : video.title,
  //       }
  //     });
  //     console.log(updatedVideos);
  //     setVideos(updatedVideos);
  //   } catch (e) {
  //     console.log(e);
  //   } finally{
  //     setIsEdit(false);
  //   }
  // }

  const handleOpenUsers = async () => {
    setOpen(true);
    try {
      const response = await userService.getUsers(token, 10);
      setUsers(response.filter((user) => user.id !== userId));
    } catch (e) {
      console.log(e);
    }
  };

  const getAccess = async () => {
    try {
      if (authUserId) {
        const response = await videoService.getAccess(authUserId!, id!);
        setAccess(response.access);
        console.log(response);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAccess();
  }, [authUserId]);

  return (
    <div className="video_card">
        <p className="video_card_title">{title}</p>
        <ReactPlayer
            url={`http://localhost:8000/users/${userId}/videos/${id}`}
            playing={false}
            loop={true}
            pip={true}
            controls
            width="20vw"
            height="30vh"
        />
        
        <form>
            <input className="video_card_button" type="button" value="open" onClick={handleOpenUsers}></input>
            <input className="video_card_button" type="button" value="delete" onClick={handleDeleteVideo}></input>
            <input className="video_card_button" type="button" value="edit"></input>
          </form>
    </div>
    
  )};

export default VideoCard;
