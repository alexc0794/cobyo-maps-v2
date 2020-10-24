import { Dispatch } from "redux";

import { UserActionTypes, LOGIN_SUCCESS } from "./actionTypes";
import { login as loginApi } from "./api";
import { User } from "../interfaces";

function loginSuccess(user: User): UserActionTypes {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
}

export const login = ({
  phoneNumber,
  name,
}: {
  phoneNumber: string;
  name: string;
}) => async (dispatch: Dispatch) => {
  const user: User | null = await loginApi(phoneNumber, name);
  if (user) {
    dispatch(loginSuccess(user));
    window.localStorage.setItem("user", JSON.stringify(user));
  }
};
