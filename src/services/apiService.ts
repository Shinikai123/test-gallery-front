import axios from "axios";

abstract class ApiService {
  private readonly instance = axios.create({
    baseURL: `http://localhost:8000/`,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  protected _get = async <ReturnType = unknown>(
    url: string,
    params?: object,
    token?: string
  ): Promise<ReturnType> => {
    try {
      if (token) {
        this._setAuthToken(token);
      }
      const res = await this.instance.get(url, { params });
      return res.data;
    } catch (error) {
      return Promise.reject(this._handleError(error));
    }
  };

  protected _put = async <ReturnType, BodyType>(
    url: string,
    body: BodyType
  ): Promise<ReturnType> => {
    try {
      const res = await this.instance.put(url, body);
      return res.data;
    } catch (error) {
      return Promise.reject(this._handleError(error));
    }
  };

  protected _post = async <
    ReturnType = unknown,
    BodyType = unknown,
    ParamsType = unknown
  >(
    url: string,
    body: BodyType,
    params?: any,
    token?: string
  ): Promise<ReturnType> => {
    try {
      if (token) {
        this._setAuthToken(token);
      }
      const res = await this.instance.post(url, body, { ...params} );
      return res.data;
    } catch (error) {
      return Promise.reject(this._handleError(error));
    }
  };

  protected _delete = async <ReturnType>(url: string): Promise<ReturnType> => {
    try {
      const res = await this.instance.delete(url);
      return res.data;
    } catch (error) {
      return Promise.reject(this._handleError(error));
    }
  };

  protected _setAuthToken = (token: string) => {
    this.instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  protected _handleError = (error: any) => {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      throw error.response.data;
    } else if (error.request) {
     
      console.log(error.request);
      throw error.request;
    } else {
      console.log("Error", error.message);
      throw error;
    }
  };
}

export default ApiService;
