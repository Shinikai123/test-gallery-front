export interface IVideo {
    title: string;
}

export interface IVideoData extends IVideo {
    userId: string;
    private: string;
}

export interface IVideoResponse {
    videoId?: string;
    status: string;
}