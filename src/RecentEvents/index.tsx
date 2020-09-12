import React from "react";
import PropTypes, { InferProps } from "prop-types";
import Button from "react-bootstrap/Button";

import useLocalStorage from "../hooks/useLocalStorage";
import { RecentEvent } from "../interfaces";
import { MOCK_RECENT_EVENTS } from "../mocks";
import "./index.css";

function RecentEvents({ onSelect }: InferProps<typeof RecentEvents.propTypes>) {
  const { value: recentEvents } = useLocalStorage<Array<RecentEvent>>(
    "recentEvents",
    MOCK_RECENT_EVENTS // TODO: Replace with []
  );

  if (!recentEvents.length) {
    return null;
  }

  return (
    <div className="RecentEvents">
      <h4 className="RecentEvents-header">Go again</h4>
      {(recentEvents as Array<RecentEvent>).map(recentEvent => (
        <Button
          key={recentEvent.name}
          variant="dark"
          className="RecentEvents-event"
          onClick={() => onSelect(recentEvent)}
        >
          <p className="RecentEvents-event-name">{recentEvent.name}</p>
          <span className="RecentEvents-event-description">
            You took a {recentEvent.transportMode.toLowerCase()} here.
          </span>
        </Button>
      ))}
    </div>
  );
}

RecentEvents.propTypes = {
  onSelect: PropTypes.func.isRequired
};

RecentEvents.defaultProps = {
  onSelect() {}
};

export default RecentEvents;
