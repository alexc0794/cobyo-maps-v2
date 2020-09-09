import {
  Event,
  EventUser,
  ActiveEvent,
  RecentEvent,
  TransportMode
} from "../interfaces";

const MOCK_ME: EventUser = {
  name: "Alegs Chow",
  lastUpdatedMs: new Date().getTime() - 5 * 60 * 1000, // Updated 5 minutes ago
  transportMode: TransportMode.Walk,
  etaMs: new Date().getTime() + 15 * 60 * 1000, // 15 minutes away
  phoneNumber: "7034720567",
  position: {
    // 561 10th Ave
    latitude: 40.759116,
    longitude: -73.9964225
  },
  settings: {
    isLocationSharingEnabled: true
  },
  profilePicUrl:
    "https://scontent-lga3-2.xx.fbcdn.net/v/t1.0-1/cp0/p60x60/27066944_10215766331491504_3714665914039678592_n.jpg?_nc_cat=101&_nc_sid=7206a8&_nc_ohc=_CdxB0PqhEgAX-8pQEV&_nc_ht=scontent-lga3-2.xx&oh=0afd524b2647d229fc8b66b28c5d9e69&oe=5F7A7B33"
};

export const MOCK_EVENT: Event = {
  eventId: "1",
  name: "Mission NYC",
  eventUsers: [
    MOCK_ME,
    {
      name: "Donald Trump",
      lastUpdatedMs: new Date().getTime() - 30 * 60 * 1000, // Updated 30 minutes ago
      transportMode: TransportMode.Lyft,
      etaMs: new Date().getTime() + 60 * 60 * 1000, // 1 hour away
      settings: {
        isLocationSharingEnabled: true
      },
      position: {
        // Port Authority
        latitude: 40.7587159,
        longitude: -73.991603
      }
    },
    {
      name: "Joe Biden",
      lastUpdatedMs: new Date().getTime() - 15 * 60 * 1000, // Updated 15 minutes ago
      transportMode: TransportMode.Car,
      etaMs: null,
      settings: {
        isLocationSharingEnabled: false
      }
    },
    {
      name: "Elon Musk",
      lastUpdatedMs: new Date().getTime() - 15 * 60 * 1000, // Updated 1 minutes ago
      transportMode: TransportMode.Car,
      etaMs: new Date().getTime() - 5 * 60 * 1000, // should have arrived 5 minutes ago
      settings: {
        isLocationSharingEnabled: true
      },
      position: {
        // Silver Towers
        latitude: 40.7614426,
        longitude: -74.0022841
      }
    }
  ],
  createdAtMs: new Date().getTime() - 10 * 60 * 1000,
  scheduledForMs: new Date().getTime() + 0.1 * 60 * 1000, // Event happening in 10 seconds
  endedAtMs: null,
  place: {
    position: {
      // 40.7559738,-74.0006607
      latitude: 40.7559738,
      longitude: -74.0006607
    },
    googlePlaceId: "ChIJs-E1jKlZwokR5hN4X81BDuU",
    mainText: "Mission NYC",
    secondaryText: "West 28th Street, New York, NY, USA"
  },
  me: MOCK_ME
};

export const MOCK_ACTIVE_EVENT: ActiveEvent = {
  eventId: "4",
  name: "Mission NYC",
  scheduledForMs: new Date().getTime() + 10 * 60 * 1000,
  transportMode: "Transit",
  place: {
    position: {
      latitude: 40.7480046,
      longitude: -73.9969309
    },
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
      position: {
        latitude: 0,
        longitude: 0
      },
      googlePlaceId: "ChIJE38rC01YwokRKx7NOG9qSVA"
    }
  },
  {
    eventId: "2",
    name: "LaGuardia Airport",
    scheduledForMs: new Date().getTime() - 60 * 60 * 1000,
    transportMode: "Walk",
    place: {
      position: {
        latitude: 0,
        longitude: 0
      },
      googlePlaceId: "ChIJtU1Cg4lfwokRs2aWDmbEL3c"
    }
  },
  {
    eventId: "3",
    name: "Times Square",
    scheduledForMs: new Date().getTime() - 24 * 60 * 60 * 1000,
    transportMode: "Lyft",
    place: {
      position: {
        latitude: 0,
        longitude: 0
      },
      googlePlaceId: "ChIJmQJIxlVYwokRLgeuocVOGVU"
    }
  }
];
