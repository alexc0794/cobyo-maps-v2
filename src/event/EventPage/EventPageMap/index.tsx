import React from "react";

import usePosition from "../../../hooks/usePosition";
import GoogleMap from "../../../GoogleMap";
import { Position, Event, EventUser, Place } from "../../../interfaces";

function calculateCenter(
  userPosition: Position,
  destinationPosition: Position
): Position {
  return {
    latitude: (userPosition.latitude + destinationPosition.latitude) / 2,
    longitude: (userPosition.longitude + destinationPosition.longitude) / 2
  };
}

function addMarkers(
  map: google.maps.Map,
  eventUsers: Array<EventUser>,
  destination: Place
) {
  const destinationMarker = new window.google.maps.Marker({
    position: {
      lat: destination.position.latitude,
      lng: destination.position.longitude
    },
    title: destination.mainText,
    label: destination.mainText
  });
  destinationMarker.setMap(map);

  eventUsers.forEach(eventUser => {
    if (eventUser.position) {
      const marker = new window.google.maps.Marker({
        position: {
          lat: eventUser.position.latitude,
          lng: eventUser.position.longitude
        },
        title: eventUser.name,
        label: eventUser.profilePicUrl ? undefined : eventUser.name,
        icon: eventUser.profilePicUrl
      });
      marker.setMap(map);
    }
  });
}

type EventPageMapProps = {
  event: Event;
};

function EventPageMap({ event }: EventPageMapProps) {
  const { position } = usePosition(event.me, event.eventId);
  if (!position) {
    return null;
  }

  const { latitude: userLatitude, longitude: userLongitude } = position;
  const {
    latitude: centerLatitude,
    longitude: centerLongitude
  } = calculateCenter(
    {
      latitude: userLatitude,
      longitude: userLongitude
    },
    {
      latitude: event.place.position.latitude,
      longitude: event.place.position.longitude
    }
  );

  function handleMount(map: google.maps.Map) {
    addMarkers(map, event.eventUsers, event.place);
  }

  return (
    <GoogleMap
      options={{
        center: { lat: centerLatitude, lng: centerLongitude },
        zoom: 15,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false
      }}
      onMount={(map: google.maps.Map) => handleMount(map)}
    />
  );
}

export default EventPageMap;
