import React, { FC, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import videoService from "../../../services/videoService";
import { IVideo } from "../../../interfaces/Video";
import { useAppSelector } from "../../../hooks/redux";
import { IUser } from "../../../interfaces/User";
import Control from "./Control";
import "./VideoCard.css"

type Props = {
  videos: IVideo[];
  setVideos: (iVideo: IVideo[]) => void;
  title: string;
  id: string ;
};

const VideoCard: FC<Props> = ({ title, videos, setVideos, id }) => {
  const { userId } = useParams();
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [access, setAccess] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const authUserId = useAppSelector((state) => state.auth.user.id);
  const [titleValue, setTitleValue] = useState(title)
  const { token } = useAppSelector((state) => state.auth);

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

  const handleChangeTitle = (e) => {
    setTitleValue(e.target.value);
  }

  useEffect(() => {
    getAccess();
  }, [authUserId]);

  return (
    <div className="video_card">
      {isEdit ? (
      <input value={titleValue} className="video_card_title" onChange={handleChangeTitle}></input>
        ) : (
          <p className="video_card_title">{title}</p>
        )}
        <ReactPlayer
            url={`http://localhost:8000/users/${userId}/videos/${id}`}
            playing={false}
            loop={true}
            pip={true}
            controls
            width="20vw"
            height="30vh"
        />
        
        <Control
        videos={videos}
        setVideos={setVideos}
        videoId={id}
        userId={userId!}
        authUserId={authUserId!}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        setOpen={setOpen}
        setUsers={setUsers}
        titleValue={titleValue}
        access={access}
        token={token}
        />
    </div>
    
  )};

export default VideoCard;
