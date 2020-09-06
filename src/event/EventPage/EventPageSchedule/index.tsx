import React from "react";
import Spinner from "react-bootstrap/Spinner";

import { Event } from "../../../interfaces";
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
  return (
    <div className="EventPageSchedule">
      <EventPageScheduleItem title="Projected Arrival" timeMs={null} />
      <EventPageScheduleItem title="Scheduled" timeMs={event.scheduledForMs} />
    </div>
  );
}

type EventPageScheduleProps = {
  event: Event;
};

export default EventPageSchedule;
