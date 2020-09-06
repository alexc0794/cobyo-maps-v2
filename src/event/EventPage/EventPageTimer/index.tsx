import React from "react";
import Alert from "react-bootstrap/Alert";

import { Event } from "../../../interfaces";
import "./index.css";

const TEN_MINUTES_IN_MS = 10 * 60 * 1000;

function EventPageTimer({ event }: EventPageTimerProps) {
  const scheduledForMs = event.scheduledForMs;
  const nowMs = new Date().getTime();

  function getAlertVariant(
    scheduledForMs: number | null,
    nowMs: number
  ): string {
    if (scheduledForMs === null) {
      return "info";
    } else if (nowMs >= scheduledForMs) {
      // If the event is past due, use "danger"
      return "danger";
    } else if (scheduledForMs - nowMs < TEN_MINUTES_IN_MS) {
      return "warning";
    } else {
      return "success";
    }
  }

  function getAlertMessage(
    scheduledForMs: number | null,
    nowMs: number
  ): string {
    if (scheduledForMs === null) {
      return "An ETA has not been set.";
    }
    const diffInMs = scheduledForMs - nowMs;
    const diffInMinutes = Math.round(diffInMs / 1000 / 60);

    // if (diffInMinutes > 5) {
    //   const scheduledForDate = new Date(scheduledForMs);
    //   const hour = scheduledForDate.getHours();
    //   const minute = scheduledForDate.getMinutes();
    //   return `Arrive by ${hour}:${minute}`;
    // }

    return `Event is scheduled to begin in ${diffInMinutes} min.`;
  }

  return (
    <Alert variant={getAlertVariant(scheduledForMs, nowMs)}>
      {getAlertMessage(scheduledForMs, nowMs)}
    </Alert>
  );
}

type EventPageTimerProps = {
  event: Event;
};

export default EventPageTimer;
