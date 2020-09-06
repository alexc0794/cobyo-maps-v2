// TransportMode - types of modes a user can choose to use for transportation
export enum TransportMode {
  Walk,
  Car,
  Transit,
  Lyft
  // TODO: Lyft, Uber, other Transit APIs can unlock more modes
}

// Place - the entity representing an event location
export interface Place {
  latitude: number;
  longitude: number;
  googlePlaceId?: string;
  mainText?: string;
  secondaryText?: string;
}

export interface EventUser {
  name: string;
  lastUpdatedMs: number;
  transportMode: TransportMode | null;
  etaMs: number | null;
  isOnTheWay?: boolean;
}

// Event - the entity representing an organized event attended by users
export interface Event {
  eventId: string;
  name: string;
  eventUsers: Array<EventUser>;
  createdAtMs: number;
  scheduledForMs: number | null;
  endedAtMs: number | null;
  place: Place; // TODO: Do we want this to be nullable?
  me?: EventUser; // This field is derived on the backend by searching eventUsers for the requester
}

// LocallyStoredEvent [private] - the event metadata to be stored in browser's local storage
interface LocallyStoredEvent {
  eventId: string;
  name: string;
  scheduledForMs: number;
  transportMode: string; // Local storage won't recognize enums so save as string
  place: Place;
}

// RecentEvent - the event metadata from a recently attended event stored in local storage
export interface RecentEvent extends LocallyStoredEvent {}

// ActiveEvent - the event metadata from an active event stored in local storage
export interface ActiveEvent extends LocallyStoredEvent {}
