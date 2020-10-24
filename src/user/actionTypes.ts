import { User } from "../interfaces";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: User;
}

export type UserActionTypes = LoginSuccessAction;
