import { useState } from "react";
import { usePosition } from "use-position";
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
  setWatch: (watch: boolean) => void;
  setIsLocationSharingEnabled: (enabled: boolean) => void;
};

export default function(
  me: EventUser | null,
  eventId: string | null
): UsePositionType {
  const [isLocationSharingEnabled, setIsLocationSharingEnabled] = useState<
    boolean
  >(me ? me.settings.isLocationSharingEnabled : false);
  const [watch, setWatch] = useState<boolean>(true);
  const { latitude, longitude, timestamp } = usePosition(watch);
  if (
    latitude === undefined ||
    longitude === undefined ||
    timestamp === undefined
  ) {
    return {
      isLocationSharingEnabled,
      position: null,
      setWatch,
      setIsLocationSharingEnabled
    };
  }

  if (isLocationSharingEnabled && me && eventId) {
    (async () => {
      await updateEventUserPositionDebounced(
        { latitude, longitude },
        timestamp,
        me.name,
        eventId
      );
    })();
  }

  return {
    isLocationSharingEnabled,
    position: { latitude, longitude },
    setWatch,
    setIsLocationSharingEnabled
  };
}
