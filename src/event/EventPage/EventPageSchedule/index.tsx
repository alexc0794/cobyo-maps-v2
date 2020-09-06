import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { usePosition } from "use-position";

import { getDistance } from "../../../helpers";
import useGoogleMaps from "../../../hooks/useGoogleMaps";
import { Event, TransportMode } from "../../../interfaces";
import "./index.css";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

function EventPageScheduleItem({ title, timeMs }: EventPageScheduleItemProps) {
  function getFormattedDate(timeMs: number): string {
    const date = new Date(timeMs);
    const day = DAYS[date.getDay()];
    const month = MONTHS[date.getMonth()];
    const monthDate = date.getDate();
    return `${day}, ${month} ${monthDate}`;
  }

  function getFormattedTime(timeMs: number): string {
    const date = new Date(timeMs);
    const meridian = date.getHours() >= 12 ? "pm" : "am";
    let hour = date.getHours() % 12;
    if (hour === 0) {
      hour = 12;
    }
    let minutes = date.getMinutes().toString();
    if (date.getMinutes() < 10) {
      // append a 0 so there are 2 digits
      minutes = `0${minutes}`;
    }
    return `${hour}:${minutes} ${meridian}`;
  }

  return (
    <div className="EventPageScheduleItem">
      <h3 className="EventPageScheduleItem-title">{title}</h3>

      {timeMs ? (
        <>
          <p className="EventPageScheduleItem-date">
            {getFormattedDate(timeMs)}
          </p>
          <p className="EventPageScheduleItem-time">
            {getFormattedTime(timeMs)}
          </p>
        </>
      ) : (
        <div className="EventPageScheduleItem-spinner">
          <Spinner animation="border" variant="secondary" />
        </div>
      )}
    </div>
  );
}

type EventPageScheduleItemProps = {
  title: string;
  timeMs: number | null;
};

function EventPageSchedule({ event }: EventPageScheduleProps) {
  const [projectedArrivalMs, setProjectedArrivalMs] = useState<number | null>(
    null
  );

  async function calculateDistance(
    transportMode: TransportMode,
    latitude: number,
    longitude: number,
    googlePlaceId: string
  ) {
    const durationInMs = await getDistance(
      transportMode,
      latitude,
      longitude,
      googlePlaceId
    );
    setProjectedArrivalMs(durationInMs + new Date().getTime());
  }

  const { latitude, longitude } = usePosition(true); // TODO: Should we watch the users position? How do we configure frequency?
  const isGoogleLoaded = useGoogleMaps();
  const transportMode: TransportMode | null = event.me
    ? event.me.transportMode
    : null;
  const googlePlaceId = event.place.googlePlaceId;

  useEffect(() => {
    if (
      isGoogleLoaded &&
      transportMode !== null &&
      latitude &&
      longitude &&
      googlePlaceId
    ) {
      calculateDistance(transportMode, latitude, longitude, googlePlaceId);
    }
  }, [isGoogleLoaded, latitude, longitude, transportMode, googlePlaceId]);

  return (
    <div className="EventPageSchedule">
      <EventPageScheduleItem
        title="Projected Arrival"
        timeMs={projectedArrivalMs}
      />
      <EventPageScheduleItem title="Scheduled" timeMs={event.scheduledForMs} />
    </div>
  );
}

type EventPageScheduleProps = {
  event: Event;
};

export default EventPageSchedule;
