import ApiService from "./apiService";
import { IUser } from "../interfaces/User";

class UserService extends ApiService {
  constructor() {
    super();
  }

  uploadAvatar = (userId: string, file: File): Promise<IUser> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', file.name);
    return this._post(`/upload/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  deleteAvatar = (avatar: string): Promise<any> => {
    return this._get(`/delete/${avatar}`);
  };

  updateAvatar = (userId: string, avatar: string): Promise<string> => {
    return this._post(`avatar/${userId}`, {avatar});
  }

  getUserById = (user_id: string): Promise<IUser> => {
    return this._get(`users/${user_id}`);
  };

  getUsers = (token: string, limit?: number): Promise<IUser[]> => {
    return this._get("users", { limit }, token);
  };
}

export default new UserService();
