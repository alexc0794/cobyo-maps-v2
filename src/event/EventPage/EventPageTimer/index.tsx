import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";

import { Event } from "../../../interfaces";
import "./index.css";

const TEN_MINUTES_IN_MS = 10 * 60 * 1000;

function EventPageTimer({ event }: EventPageTimerProps) {
  const scheduledForMs = event.scheduledForMs;
  const [nowMs, setNowMs] = useState<number>(new Date().getTime());

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
    const diffInSeconds = Math.round((scheduledForMs - nowMs) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const remainingSeconds = Math.round(diffInSeconds % 60);
    return `Event is scheduled to begin in ${diffInMinutes}:${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }.`;
  }

  useEffect(() => {
    let interval = setInterval(() => {
      setNowMs(new Date().getTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
