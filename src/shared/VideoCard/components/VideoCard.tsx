import React, { FC, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import videoService from "../../../services/videoService";
import { IVideo } from "../../../interfaces/Video";
import { useAppSelector } from "../../../hooks/redux";
import { IUser } from "../../../interfaces/User";
import userService from "../../../services/userService";

type Props = {
  videos: IVideo[];
  setVideos: (iVideo: IVideo[]) => void;
  title: string | undefined;
  id: string | undefined;
};

const VideoCard: FC<Props> = ({ title, videos, setVideos, id }) => {
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

  const pageValidation = authUserId === userId;

  const handleEditMovie = async () => {
    setIsEdit(true);
  };

  const handleOpenUsers = async () => {
    setOpen(true);
    try {
      const response = await userService.getUsers(10, token);
      setUsers(response);
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
            pip={true}
            light={true}
            url={`http://localhost:8000/api/${userId}/movies/${id}`}
            controls
            width="100%"
            height="22vh"
        />
        {pageValidation && (
        <div>
            <input onClick={handleOpenUsers}></input>
            <input onClick={handleEditMovie}></input>
            <input onClick={handleDeleteVideo}></input>
        </div>
        )}
    </div>
    
  )};

export default VideoCard;
