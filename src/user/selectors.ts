import { User, SessionToken, EventUser } from "../interfaces";

const selectUser = (state: any): User | null => state.user;

export const selectUserName = (state: any): string | null => {
  const user: User | null = selectUser(state);
  return user ? user.name : null;
};

const selectSessionToken = (state: any): SessionToken | null => {
  const user: User | null = selectUser(state);
  return user ? user.sessionToken : null;
};

export const selectToken = (state: any): string | null => {
  const sessionToken: SessionToken | null = selectSessionToken(state);
  return sessionToken ? sessionToken.token : null;
};

export const selectEventUser = (state: any): EventUser | null => {
  const user: User | null = selectUser(state);
  if (!user) {
    return null;
  }

  return {
    name: user.name,
    lastUpdatedMs: new Date().getTime(),
    transportMode: null,
    etaMs: null,
    settings: { isLocationSharingEnabled: true }, // TODO
    phoneNumber: user.phoneNumber,
  };
};
