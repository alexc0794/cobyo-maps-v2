import { useEffect, useRef, useState } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";

import { Position, EventUser } from "../interfaces";

async function updateEventUserPosition(
  position: Position,
  updatedAtMs: number,
  name: string,
  eventId: string
) {
  await Promise.resolve();
}

const updateEventUserPositionDebounced = AwesomeDebouncePromise(
  updateEventUserPosition,
  5000
); // Dont call this more than once every 5 seconds

type UsePositionType = {
  isLocationSharingEnabled: boolean;
  position: Position | null;
  setIsLocationSharingEnabled: (enabled: boolean) => void;
};

type GeolocationType = {
  latitude: number;
  longitude: number;
  timestamp: number;
};

export default function(
  me: EventUser | null,
  eventId: string | null
): UsePositionType {
  const [isLocationSharingEnabled, setIsLocationSharingEnabled] = useState<
    boolean
  >(me ? me.settings.isLocationSharingEnabled : false);
  const [geolocation, setGeolocation] = useState<GeolocationType | null>(null);

  let mountedRef = useRef<boolean>(true);
  let watchRef = useRef<number>();
  const seconds = 5000;

  function onPositionEvent(event: any) {
    if (!mountedRef.current) {
      return;
    }
    setGeolocation({
      latitude: event.coords.latitude,
      longitude: event.coords.longitude,
      timestamp: event.timestamp
    });
  }

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    if (!isLocationSharingEnabled && watchRef.current) {
      navigator.geolocation.clearWatch(watchRef.current);
      return;
    }

    navigator.geolocation.getCurrentPosition(onPositionEvent);
    if (!watchRef.current) {
      watchRef.current = navigator.geolocation.watchPosition(onPositionEvent);
    }

    return () => {
      mountedRef.current = false;
      if (watchRef.current) {
        navigator.geolocation.clearWatch(watchRef.current);
      }
    };
  }, [isLocationSharingEnabled, seconds]);

  const position: Position | null = geolocation
    ? {
        latitude: geolocation.latitude,
        longitude: geolocation.longitude
      }
    : null;

  if (isLocationSharingEnabled && me && eventId && position && geolocation) {
    (async () => {
      await updateEventUserPositionDebounced(
        position,
        geolocation.timestamp,
        me.name,
        eventId
      );
    })();
  }

  return {
    isLocationSharingEnabled,
    position,
    setIsLocationSharingEnabled
  };
}
