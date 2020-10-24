import { User, SessionToken } from "../interfaces";

const selectUser = (state: any): User | null => state.user;

const selectSessionToken = (state: any): SessionToken | null => {
  const user: User | null = selectUser(state);
  return user ? user.sessionToken : null;
};

export const selectToken = (state: any): string | null => {
  const sessionToken: SessionToken | null = selectSessionToken(state);
  return sessionToken ? sessionToken.token : null;
}
