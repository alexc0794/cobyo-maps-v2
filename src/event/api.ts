import axios from "axios";

import { Event, EventUser, Place } from "../interfaces";
import { BASE_API_URL } from "../config";

export async function fetchEvent(
  eventId: string,
  token: string | null
): Promise<Event | null> {
  const headers = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const response = await axios.get(`${BASE_API_URL}/event/${eventId}`, {
      headers,
    });
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function joinEvent(
  eventId: string,
  eventUser: EventUser,
  token: string
): Promise<Event | null> {
  const headers = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const response = await axios.post(
      `${BASE_API_URL}/event/join`,
      {
        eventId,
        eventUser,
      },
      { headers }
    );
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function createEvent(
  name: string,
  place: Place,
  eventUser: EventUser,
  token: string
): Promise<Event | null> {
  const headers = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const response = await axios.post(
      `${BASE_API_URL}/event/create`,
      {
        name,
        place,
        eventUser,
      },
      { headers }
    );
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
}
