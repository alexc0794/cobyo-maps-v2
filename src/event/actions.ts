import { Dispatch } from "redux";

import {
  EventActionTypes,
  FETCH_EVENT_SUCCESS,
  JOIN_EVENT_SUCCESS,
  CREATE_EVENT_SUCCESS,
} from "./actionTypes";
import {
  fetchEvent as fetchEventApi,
  joinEvent as joinEventApi,
  createEvent as createEventApi,
} from "./api";
import { Event, TransportMode, Place } from "../interfaces";
import { selectToken, selectEventUser } from "../user/selectors";

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
  transportMode: TransportMode | null = null
) => async (dispatch: Dispatch, getState: () => any) => {
  const state = getState();
  const token = selectToken(state);
  const eventUser = selectEventUser(state);

  if (!token || !eventUser) {
    return;
  }

  const event = await joinEventApi(
    eventId,
    { ...eventUser, transportMode },
    token
  );
  if (event) {
    dispatch(joinEventSuccess(event));
  }
};

function createEventSuccess(event: Event): EventActionTypes {
  return {
    type: CREATE_EVENT_SUCCESS,
    payload: event,
  };
}

export const createEvent = (
  name: string,
  place: Place,
  transportMode: TransportMode
) => async (dispatch: Dispatch, getState: () => any) => {
  const state = getState();
  const token = selectToken(state);
  const eventUser = selectEventUser(state);

  if (!token || !eventUser) {
    throw new Error();
  }

  const event = await createEventApi(name, place, eventUser, token);
  if (event) {
    dispatch(createEventSuccess(event));
    return event.eventId;
  }

  throw new Error();
};
