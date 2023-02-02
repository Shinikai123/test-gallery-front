export interface ILoginData {
    user_email : string;
    password: string;
}

export interface IToken {
    error : string | null;
    expires_in: number;
    accessToken: string;
}

export interface ILoginResponse extends IToken {
    id: string;
    user_name : string;
    email: string;
}

export interface IRegisterResponse extends IToken {
    id: string;
    user_name: string;
    email: string;
}

export interface IRegisterData {
    user_name: string;
    user_email: string;
    password: string;
}

export interface IFulfilledAction {
    id: string;
    user_name: string;
    user_email: string;
    token: IToken;
}