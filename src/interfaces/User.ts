import {FetchStatus} from "../store/interfaces/State";

export interface IUserState {
    user: IUser;
    status: FetchStatus;
    token: string;
    error: string;
}

export interface IUser {
    id: string;
    user_name: string;
    user_email: string;
    avatar?: string;
    error?: string;
}