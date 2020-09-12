import { useState } from "react";

import useLocalStorage from "./useLocalStorage";

type UserLogin = {
  userId: string;
  name: string;
  phoneNumber: string | null;
};

export default function() {
  const {
    value: userLogin,
    setValue: setUserLogin
  } = useLocalStorage<UserLogin | null>("login", null);
  const [token, setToken] = useState<string | null>(null);

  async function loginUser(
    userId: string,
    name: string,
    phoneNumber: string | null
  ) {
    const { token } = await Promise.resolve({ token: "asdf" });
    setToken(token);
    setUserLogin({ userId, name, phoneNumber });
  }
  return {
    userId: userLogin ? userLogin.userId : null,
    name: userLogin ? userLogin.name : null,
    phoneNumber: userLogin ? userLogin.phoneNumber : null,
    token,
    loginUser
  };
}
