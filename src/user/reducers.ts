import { UserActionTypes, LOGIN_SUCCESS } from "./actionTypes";
import { User } from "../interfaces";

const localStorageUser = window.localStorage.getItem("user");
const initialValue = localStorageUser ? JSON.parse(localStorageUser) : null;

function user(state: User | null = initialValue, action: UserActionTypes) {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      const user: User = action.payload;
      return user;
    }
    default:
      return state;
  }
}

export default user;
