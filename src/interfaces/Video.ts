export interface IVideo {
    id: string;
    title: string;
    url: string;
    ovner: string;
}

export interface IVideoData extends IVideo {
    userId: string;
    private: string;
}

export interface IVideoResponse {
    videoId?: string;
    status: string;
}

export interface IAccess {
    user_id : string;
    video_id: string;
    access: string;
}