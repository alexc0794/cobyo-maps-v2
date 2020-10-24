import { Event } from "../interfaces";

export const selectEvent = (state: any): Event | null => state.event;
