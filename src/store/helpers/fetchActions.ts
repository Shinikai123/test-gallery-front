import { PayloadAction } from "@reduxjs/toolkit";
import { IError } from "../interfaces/Errors";
import { FetchStatus, IState } from "../interfaces/State";

export const pendAction = (state: IState) => {
  state.status = FetchStatus.LOADING;
  state.error = null;
};

export const resolveAction = (state: IState) => {
  state.status = FetchStatus.RESOLVED;
  state.error = null;
};

export const rejectAction = (state: IState, action: PayloadAction<IError>) => {
  state.status = FetchStatus.REJECTED;
  state.error = action.payload;
};
