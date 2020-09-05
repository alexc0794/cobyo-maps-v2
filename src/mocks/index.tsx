import { ActiveEvent, RecentEvent } from "../interfaces";

// export const MOCK_EVENT: Event = {};

export const MOCK_ACTIVE_EVENT: ActiveEvent = {
  eventId: "4",
  name: "Mission NYC",
  scheduledForMs: new Date().getTime() + 10 * 60 * 1000,
  transportMode: "Transit",
  googlePlaceId: "ChIJs-E1jKlZwokR5hN4X81BDuU"
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
    googlePlaceId: "ChIJE38rC01YwokRKx7NOG9qSVA"
  },
  {
    eventId: "2",
    name: "LaGuardia Airport",
    scheduledForMs: new Date().getTime() - 60 * 60 * 1000,
    transportMode: "Walk",
    googlePlaceId: "ChIJtU1Cg4lfwokRs2aWDmbEL3c"
  },
  {
    eventId: "3",
    name: "Times Square",
    scheduledForMs: new Date().getTime() - 24 * 60 * 60 * 1000,
    transportMode: "Lyft",
    googlePlaceId: "ChIJmQJIxlVYwokRLgeuocVOGVU"
  }
];
