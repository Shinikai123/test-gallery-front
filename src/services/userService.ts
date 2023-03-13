import ApiService from "./apiService";
import { IUser } from "../interfaces/User";

class UserService extends ApiService {
  constructor() {
    super();
  }

  getUserById = (userId: string): Promise<IUser> => {
    return this._get(`users/${userId}`);
  };

  getUsers = (token: string, limit?: number): Promise<IUser[]> => {
    return this._get("users", { limit }, token);
  };

  getAvatar = (userId: string): Promise<any> => {
    return this._get(`users/avatar/${userId}`);
  };

  uploadAvatar = (userId: string, file: File): Promise<any> => {
    
    const formData = new FormData();
    formData.append("file", file);
    return this._post(`users/avatar/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
}

export default new UserService();
