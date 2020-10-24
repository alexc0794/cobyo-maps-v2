import { Event } from "../interfaces";

export const FETCH_EVENT_SUCCESS = "FETCH_EVENT_SUCCESS";
export const JOIN_EVENT_SUCCESS = "JOIN_EVENT_SUCCESS";

interface FetchEventSuccessAction {
  type: typeof FETCH_EVENT_SUCCESS;
  payload: Event;
}

interface JoinEventSuccessAction {
  type: typeof JOIN_EVENT_SUCCESS;
  payload: Event;
}

export type EventActionTypes = FetchEventSuccessAction | JoinEventSuccessAction;
