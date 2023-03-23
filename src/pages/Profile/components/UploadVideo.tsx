import { FC, useRef } from "react";
import { useParams } from "react-router-dom";
import { IVideo } from "../../../interfaces/Video";
import videoService from "../../../services/videoService";
import "./UploadVideo.css"

type Props = {
    setVideos: (video: IVideo[]) => void;
    videos: IVideo[];
};

const UploadVideo: FC<Props> = ({setVideos, videos}) => {
    const fileRef = useRef(null);
    const {userId} = useParams();

    const handleVideoUpload = async (e) => {
        // e.preventDefault();
        console.log('ftrgkjilyuty6u')
        if(e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if(!file.type.includes("video")) {
                return null;
            }   else {
                try{
                    const response = await videoService.uploadVideo(userId!, file);
                    // setVideos([response, ...videos]);
                } catch (e) {
                    console.log(e)
                }
            }
        }
    };

    return(
        <div className="upload_video_button" onChange={handleVideoUpload}>
            <label htmlFor="upload_button_video" >
                Upload Video
            </label>
            <input id="upload_button_video" type="file" accept="video/*" ref={fileRef}  placeholder="Upload Video"></input>
            </div>
        )

}

export default UploadVideo;