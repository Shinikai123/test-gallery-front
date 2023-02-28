import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserState } from "../../interfaces/User";
import { FetchStatus } from "../interfaces/State";
import AuthService from "../../services/authService";
import jwt_decode from "jwt-decode";
import { ILoginData } from "../../interfaces/Auth";
import { RootState } from "../store";
import userService from "../../services/userService";

export const logoutUser = createAsyncThunk(
  "/logoutUser",
  async function (_, thunkAPI) {
    return await AuthService.logoutUser();
  }
);

export const loginUser = createAsyncThunk(
  "/login",
  async (body: ILoginData, thunkAPI) => {
    try {
      const response = await AuthService.loginUser(body);
      localStorage.setItem("token", response.accessToken);
      return response;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
);

export const uploadAvatarAsync = createAsyncThunk(
  "upload/uploadAvatar",
  async (image: File, { getState, rejectWithValue}) => {
    const userId = (getState() as RootState).auth.user.id;
    console.log(getState())
    try{
      const res = await userService.uploadAvatar(userId, image);
      return res;
    } catch(error) {
      return rejectWithValue(error);
    }
  }
)

export const refreshToken = createAsyncThunk(
  "/refreshToken",
  async function (_, { dispatch, rejectWithValue }) {
    try {
      const res = await AuthService.refreshToken();
      setTimeout(() => {
        dispatch(refreshToken());
      }, res.expires_in - 5000);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: IUserState = {
  user: {
    id: "",
    user_name: "",
    user_email: "",
    avatar: "",
  },
  error: "",
  status: FetchStatus.LOADING,
  token: "",
};

const authSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserData(state, action) {
      const token = action.payload.accessToken;
      state.user = jwt_decode(token);
      state.token = token;
    },
    clearUserData(state) {
      state.user = {
        id: "",
        user_name: "",
        user_email: "",
        avatar: "",
      };
      state.token = "";
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadAvatarAsync.pending, (state) => {
        state.status = FetchStatus.LOADING;
      })
      .addCase(uploadAvatarAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = FetchStatus.RESOLVED;
        const {avatar} = action.payload;
        state.user.avatar = avatar;
      })
      .addCase(uploadAvatarAsync.rejected, (state) => {
        state.status = FetchStatus.REJECTED;
        state.error = "Invalid file"
      })



      .addCase(loginUser.pending, (state) => {
        state.status = FetchStatus.LOADING;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = FetchStatus.RESOLVED;
        const { id, user_name, user_email, avatar, accessToken } = action.payload;
        state.user.user_email = user_email;
        state.user.user_name = user_name;
        state.user.id = id;
        state.token = accessToken;
        state.user.avatar = avatar;
        authSlice.caseReducers.setUserData(state, action);
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = FetchStatus.REJECTED;
        state.error = "Invalid email or password";
      })



      .addCase(logoutUser.pending, (state) => {
        state.status = FetchStatus.LOADING;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = FetchStatus.RESOLVED;
        authSlice.caseReducers.clearUserData(state);
      })
      .addCase(logoutUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = FetchStatus.REJECTED;
        state.error = action.payload.error;
      })


      
      .addCase(refreshToken.pending, (state) => {
        state.status = FetchStatus.LOADING;
      })
      .addCase(refreshToken.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = FetchStatus.RESOLVED;
        const { id, user_name, user_email, avatar, accessToken } = action.payload;
        state.user.user_email = user_email;
        state.user.user_name = user_name;
        state.user.id = id;
        state.user.avatar = avatar
        state.token = accessToken;
        authSlice.caseReducers.setUserData(state, action);
      })
      .addCase(refreshToken.rejected, (state) => {
        state.status = FetchStatus.REJECTED;
      });
  },
});

export const { setUserData } = authSlice.actions;

export default authSlice.reducer;
