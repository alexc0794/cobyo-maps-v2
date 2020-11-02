import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";

import { getDistance } from "../../../helpers";
import useGoogleMaps from "../../../hooks/useGoogleMaps";
import usePosition from "../../../hooks/usePosition";
import { Event, TransportMode, Position } from "../../../interfaces";
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
  "Dec",
];

function EventPageScheduleItem({
  title,
  timeMs,
  loading,
}: EventPageScheduleItemProps) {
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
      {!timeMs && loading && (
        <div className="EventPageScheduleItem-spinner">
          <Spinner animation="border" variant="secondary" />
        </div>
      )}
      {!loading &&
        (timeMs ? (
          <>
            <p className="EventPageScheduleItem-date">
              {getFormattedDate(timeMs)}
            </p>
            <p className="EventPageScheduleItem-time">
              {getFormattedTime(timeMs)}
            </p>
          </>
        ) : (
          <>
            <p className="EventPageScheduleItem-date">--</p>
          </>
        ))}
    </div>
  );
}

type EventPageScheduleItemProps = {
  title: string;
  timeMs: number | null;
  loading: boolean;
};

function EventPageSchedule({ event }: EventPageScheduleProps) {
  const [projectedArrivalMs, setProjectedArrivalMs] = useState<number | null>(
    null
  );

  async function calculateDistance(
    transportMode: TransportMode,
    position: Position,
    googlePlaceId: string
  ) {
    try {
      const durationInMs = await getDistance(
        transportMode,
        position,
        googlePlaceId
      );
      setProjectedArrivalMs(durationInMs + new Date().getTime());
    } catch (error) {
      console.warn(error);
    }
  }

  const { position } = usePosition(event.me, event.eventId);
  const latitude = position ? position.latitude : null;
  const longitude = position ? position.longitude : null;
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
      calculateDistance(transportMode, { latitude, longitude }, googlePlaceId);
    }
  }, [isGoogleLoaded, latitude, longitude, transportMode, googlePlaceId]);

  return (
    <div className="EventPageSchedule">
      <EventPageScheduleItem
        title="Projected Arrival"
        timeMs={projectedArrivalMs}
        loading={projectedArrivalMs === null && transportMode !== null}
      />
      <EventPageScheduleItem
        title="Scheduled"
        timeMs={event.scheduledForMs}
        loading={!event}
      />
    </div>
  );
}

type EventPageScheduleProps = {
  event: Event;
};

export default EventPageSchedule;
