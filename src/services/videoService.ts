import ApiService from "./apiService";
import { IVideo, IAccess } from "../interfaces/Video";

class VideoService extends ApiService {
    constructor() {
        super();
    }

    uploadVideo = (userId: string, file: File): Promise<IVideo> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', file.name);
        return this._post(`/upload/${userId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };

    getAccess = (userId: string, video_id: string): Promise<IAccess> => {
        return this._get<IAccess>(`access/${userId}`, {video_id});
    };

    getUserVideos = (userId: string): Promise<IVideo[]> => {
        return this._get<IVideo[]>(`/users/${userId}/videos`);
    };

    deleteVideo = (videoId: string): Promise<any> => {
        return this._get(`/remove/${videoId}`);
    };
}

export default new VideoService();