import ApiService from "./apiService";
import { IUser } from "../interfaces/User";

class UserApiService extends ApiService {
  constructor() {
    super();
  }

  getUserById = (user_id: string): Promise<IUser> => {
    return this._get(`users/${user_id}`);
  };

  getUsers = (token: string, limit?: number): Promise<IUser[]> => {
    return this._get("users", { limit }, token);
  };
}

export default new UserApiService();
