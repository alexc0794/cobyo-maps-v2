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
  address: string; // Human readable address description
  latitude: number;
  longitude: number;
  googlePlaceId?: string;
}

export interface EventUser {
  name: string;
  lastUpdatedMs: number;
  transportMode: TransportMode;
  etaMs?: number;
  isOnTheWay?: boolean;
}

// Event - the entity representing an organized event attended by users
export interface Event {
  eventId: string;
  name: string;
  eventUsers: Array<EventUser>;
  createdAtMs: number;
  scheduledForMs?: number;
  endedAtMs?: number;
  place?: Place;
}

// LocallyStoredEvent [private] - the event metadata to be stored in browser's local storage
interface LocallyStoredEvent {
  eventId: string;
  name: string;
  scheduledForMs: number;
  transportMode: string; // Local storage won't recognize enums so save as string
  googlePlaceId: string;
}

// RecentEvent - the event metadata from a recently attended event stored in local storage
export interface RecentEvent extends LocallyStoredEvent {}

// ActiveEvent - the event metadata from an active event stored in local storage
export interface ActiveEvent extends LocallyStoredEvent {}
