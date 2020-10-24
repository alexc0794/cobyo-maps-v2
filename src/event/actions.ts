import { Dispatch } from "redux";

import {
  EventActionTypes,
  FETCH_EVENT_SUCCESS,
  JOIN_EVENT_SUCCESS,
} from "./actionTypes";
import { fetchEvent as fetchEventApi, joinEvent as joinEventApi } from "./api";
import { Event, EventUser } from "../interfaces";

function fetchEventSuccess(event: Event): EventActionTypes {
  return {
    type: FETCH_EVENT_SUCCESS,
    payload: event,
  };
}

export const fetchEvent = (
  eventId: string,
  token: string | null = null
) => async (dispatch: Dispatch) => {
  const event = await fetchEventApi(eventId, token);
  if (event) {
    dispatch(fetchEventSuccess(event));
  }
};

function joinEventSuccess(event: Event): EventActionTypes {
  return {
    type: JOIN_EVENT_SUCCESS,
    payload: event,
  };
}

export const joinEvent = (
  eventId: string,
  eventUser: EventUser,
  token: string
) => async (dispatch: Dispatch) => {
  const event = await joinEventApi(eventId, eventUser, token);
  if (event) {
    dispatch(joinEventSuccess(event));
  }
};
