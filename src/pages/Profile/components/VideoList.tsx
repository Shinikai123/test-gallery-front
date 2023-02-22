import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IVideo } from "../../../interfaces/Video";
import videoService from "../../../services/videoService";
import UploadVideo from "./UploadVideo";
import VideoCard from "./VideoCard";
import "./VideoList.css"

const VideoList: FC = () => {
    const [videos, setVideos] = useState<IVideo[]>([]);
    const {userId} = useParams();


    const fetchVideos = async () => {
        try{
            if(userId) {
                const response = await videoService.getUserVideos(
                    userId.toString()
                );
                if (response.length) setVideos(response);
                else setVideos([])
            }
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        fetchVideos();
    }, [userId])

 return(
    <div>
        <div className="video_list_header">
    <label className="video_list_header_label">Videos</label>
    <form>
        <UploadVideo setVideos={setVideos} videos={videos || []}/>
    </form>
        </div>
        <div className="video_list_container">
            {videos.map(video => {
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
    
 )
    
}

export default VideoList;
