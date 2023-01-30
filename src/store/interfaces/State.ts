import { IError } from "./Errors";

export enum FetchStatus {
    LOADING = "loading",
    RESOLVED = "resolved",
    REJECTED = "rejected",
}

export interface IState {
    status: FetchStatus | null;
    error: IError | null;
}