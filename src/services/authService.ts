import ApiService from "./apiService";
import 
{ILoginData, ILoginResponse, IRegisterData, IRegisterResponse, IToken}
from "../interfaces/Auth";

class AuthService extends ApiService {
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

  // sendNewPasswordAfterReset = (
  //   user_email: string,
  //   token: string,
  //   password: string
  // ): Promise<void> => {
  //   return this._post(
  //     "registration/new-password",
  //     { password },
  //     { user_email, token }
  //   );
  // };
}

export default new AuthService();
