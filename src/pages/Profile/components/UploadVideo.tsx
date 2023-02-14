import { FC, useRef } from "react";
import { useParams } from "react-router-dom";
import { IVideo } from "../../../interfaces/Video";
import videoService from "../../../services/videoService";

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
                return null;
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

export default UploadVideo;