export interface ILoginData {
    email : string;
    password: string;
}

export interface IToken {
    error : string | null;
    expires_in: number;
    accessToken: string;
}

export interface ILoginResponse extends IToken {
    id: string;
    userName : string;
    email: string;
}

export interface IRegisterResponse extends IToken {
    id: string;
    userName: string;
    email: string;
}

export interface IRegisterData {
    userName: string;
    email: string;
    password: string;
}

export interface IFulfilledAction {
    id: string;
    userName: string;
    email: string;
    token: IToken;
}