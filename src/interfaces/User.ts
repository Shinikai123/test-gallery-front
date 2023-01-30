import {FetchStatus} from "../store/interfaces/State";

export interface IUserState {
    user: IUser;
    status: FetchStatus;
    token: string;
    error: string;
}

export interface IUser {
    id: string | null;
    userName: string | null;
    email?: string | null;
    avatar?: string | null;
    error?: string;
}