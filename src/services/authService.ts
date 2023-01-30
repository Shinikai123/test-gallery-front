import ApiService from "./apiService";
import 
{ILoginData, ILoginResponse, IRegisterData, IRegisterResponse, IToken}
from "../interfaces/Auth";
import { IUser } from "../interfaces/User";

class AuthApiService extends ApiService {
  constructor() {
    super();
  }

  registerUser = (data: IRegisterData): Promise<IRegisterResponse> => {
    return this._post<IRegisterResponse, IRegisterData>("register", data);
  };

  loginUser = (data: ILoginData): Promise<ILoginResponse> => {
    return this._post<ILoginResponse, unknown, ILoginData>("login", data);
  };

  logoutUser = (): Promise<void> => {
    return this._get("logout");
  };

  getUserById = (id: string): Promise<IUser> => {
    return this._get(`users/${id}`);
  };

  refreshToken = (): Promise<IToken> => {
    return this._get<IToken>("refresh");
  };

  // verifyEmail = (token: string, email: string): Promise<void> => {
  //   return this._get(`registration/verify/${token}`, { email });
  // };
  //
  // resetPasswordRequest = (email: string): Promise<void> => {
  //   return this._get("registration/reset-password", { email });
  // };

  sendNewPasswordAfterReset = (
    email: string,
    token: string,
    password: string
  ): Promise<void> => {
    return this._post(
      "registration/new-password",
      { password },
      { email, token }
    );
  };
}

export default new AuthApiService();
