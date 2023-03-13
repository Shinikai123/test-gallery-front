import React, {FC} from "react";
import videoService from "../../../services/videoService";
import userService from "../../../services/userService";
import { IVideo } from "../../../interfaces/Video";
import { IUser } from "../../../interfaces/User";
import "./Control.css";

type Props = {
    setVideos: ( IVideos: IVideo[]) => void;
    videos: IVideo[];
    authUserId: string;
    userId: string;
    videoId: string;
    setIsEdit: (bool: boolean) => void;
    titleValue: string;
    setOpen: (bool: boolean) => void;
    setUsers: (iUsers: IUser[]) => void;
    isEdit: boolean;
    access: string;
    token: string;
};

const Control: FC<Props> =({
    setVideos,
    videos,
    videoId,
    setIsEdit,
    userId,
    authUserId,
    titleValue,
    setOpen,
    setUsers,
    isEdit,
    access,
    token
}) => {
    const handleDeleteVideo = async () => {
        try{
            await videoService.deleteVideo(videoId);
            setVideos(videos.filter((video) => video.id !== videoId));
        } catch (e) {
            console.log(e);
        }
    };

    
  const handleEditVideo = async () => {
    setIsEdit(true);
  };

  const handleSave = async () => {
    try{
      await videoService.updateVideo(videoId, titleValue);
      const updatedVideos = videos.map((video) => {
        return {
          ...video,
          title: video.id === videoId ? titleValue : video.title,
        }
      });
      console.log(updatedVideos);
      setVideos(updatedVideos);
    } catch (e) {
      console.log(e);
    } finally{
      setIsEdit(false);
    }
  }

  const handleOpenUsers = async () => {
    setOpen(true);
    try {
      const response = await userService.getUsers(token, 10);
      setUsers(response.filter((user) => user.id !== userId));
      console.log(setUsers(response.filter((user) => user.id !== userId)))  
    } catch (e) {
      console.log(e);
    }
  };


  return(
    <form className="control_panel">
            <input className="video_card_button" type="button" value="open" onClick={handleOpenUsers}></input>
            <input className="video_card_button" type="button" value="delete" onClick={handleDeleteVideo}></input>
            {isEdit ? (
                <input className="video_card_button" type="button" value="save" onClick={handleSave}></input>
            ) : (
                <input className="video_card_button" type="button" value="edit" onClick={handleEditVideo}></input>
    )}
            </form>
  )
}

export default Control;