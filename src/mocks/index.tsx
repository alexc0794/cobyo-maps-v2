import { Event, ActiveEvent, RecentEvent } from "../interfaces";

export const MOCK_EVENT: Event = {
  eventId: "1",
  name: "Mission NYC",
  eventUsers: [],
  createdAtMs: new Date().getTime() - 10 * 60 * 1000,
  scheduledForMs: new Date().getTime() + 10 * 60 * 1000,
  endedAtMs: null,
  place: {
    latitude: 40.7480046,
    longitude: -73.9969309,
    googlePlaceId: "ChIJs-E1jKlZwokR5hN4X81BDuU",
    mainText: "Mission NYC",
    secondaryText: "West 28th Street, New York, NY, USA"
  }
};

export const MOCK_ACTIVE_EVENT: ActiveEvent = {
  eventId: "4",
  name: "Mission NYC",
  scheduledForMs: new Date().getTime() + 10 * 60 * 1000,
  transportMode: "Transit",
  place: {
    latitude: 40.7480046,
    longitude: -73.9969309,
    googlePlaceId: "ChIJs-E1jKlZwokR5hN4X81BDuU"
  }
};

export const MOCK_ACTIVE_EVENT_LATE: ActiveEvent = {
  ...MOCK_ACTIVE_EVENT,
  scheduledForMs: new Date().getTime() - 10 * 60 * 1000
};

export const MOCK_RECENT_EVENTS: Array<RecentEvent> = [
  {
    eventId: "1",
    name: "561 10th Avenue",
    scheduledForMs: new Date().getTime() - 10 * 60 * 1000,
    transportMode: "Car",
    place: {
      latitude: 0,
      longitude: 0,
      googlePlaceId: "ChIJE38rC01YwokRKx7NOG9qSVA"
    }
  },
  {
    eventId: "2",
    name: "LaGuardia Airport",
    scheduledForMs: new Date().getTime() - 60 * 60 * 1000,
    transportMode: "Walk",
    place: {
      latitude: 0,
      longitude: 0,
      googlePlaceId: "ChIJtU1Cg4lfwokRs2aWDmbEL3c"
    }
  },
  {
    eventId: "3",
    name: "Times Square",
    scheduledForMs: new Date().getTime() - 24 * 60 * 60 * 1000,
    transportMode: "Lyft",
    place: {
      latitude: 0,
      longitude: 0,
      googlePlaceId: "ChIJmQJIxlVYwokRLgeuocVOGVU"
    }
  }
];
