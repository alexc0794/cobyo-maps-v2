import {
  EventActionTypes,
  FETCH_EVENT_SUCCESS,
  JOIN_EVENT_SUCCESS,
} from "./actionTypes";
import { Event } from "../interfaces";

function event(state: Event | null = null, action: EventActionTypes) {
  switch (action.type) {
    case FETCH_EVENT_SUCCESS:
    case JOIN_EVENT_SUCCESS: {
      const event: Event = action.payload;
      return event;
    }
    default:
      return state;
  }
}

export default event;
