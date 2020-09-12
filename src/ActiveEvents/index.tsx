import React from "react";
import PropTypes, { InferProps } from "prop-types";
import Button from "react-bootstrap/Button";

import useLocalStorage from "../hooks/useLocalStorage";
import { ActiveEvent } from "../interfaces";
import { MOCK_ACTIVE_EVENT } from "../mocks";
import "./index.css";

function buildDescription(nowMs: number, scheduledForMs: number): string {
  const diffInMs = nowMs - scheduledForMs;
  const diffInMinutes = Math.round(Math.abs(diffInMs) / 1000 / 60);
  if (diffInMs < 0) {
    // Happening in the future
    return `Happening in ${diffInMinutes} minutes`;
  } else {
    return `Scheduled for ${diffInMinutes} minutes ago`;
  }
}

function ActiveEvents({ onSelect }: InferProps<typeof ActiveEvents.propTypes>) {
  const { value: activeEvent } = useLocalStorage<ActiveEvent | null>(
    "activeEvent",
    MOCK_ACTIVE_EVENT // TODO: Replace with null
  );

  if (!activeEvent) {
    return null;
  }

  const nowMs = new Date().getTime();
  const scheduledForMs = (activeEvent as ActiveEvent).scheduledForMs;

  const variant = nowMs < scheduledForMs ? "primary" : "danger";

  return (
    <div className="ActiveEvents">
      <h4 className="ActiveEvents-header">Active</h4>
      <Button
        variant={variant}
        size="lg"
        className="ActiveEvents-event"
        onClick={() => onSelect(activeEvent as ActiveEvent)}
      >
        <p className="ActiveEvents-event-name">{activeEvent.name}</p>
        <span className="ActiveEvents-event-description">
          {buildDescription(nowMs, scheduledForMs)}
        </span>
      </Button>
    </div>
  );
}

ActiveEvents.propTypes = {
  onSelect: PropTypes.func.isRequired
};

ActiveEvents.defaultProps = {
  onSelect() {}
};

export default ActiveEvents;
