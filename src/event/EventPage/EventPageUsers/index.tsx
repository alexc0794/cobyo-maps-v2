import React from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import { Event, EventUser, TransportMode } from "../../../interfaces";
import { TRANSPORT_MODE_TO_ACTION } from "../../../constants";
import "./index.css";

type EventPageUsersProps = {
  event: Event;
};

function EventPageUsers({ event }: EventPageUsersProps) {
  const scheduledForMs = event.scheduledForMs;
  if (scheduledForMs === null) {
    // Show UI where users are in one single list
    return null;
  }

  // Show UI where users are separated into ahead and behind schedule
  const usersAheadSchedule: Array<EventUser> = [];
  const usersBehindSchedule: Array<EventUser> = [];
  event.eventUsers.forEach((eventUser: EventUser) => {
    if (eventUser.etaMs === null || eventUser.etaMs > scheduledForMs) {
      usersBehindSchedule.push(eventUser);
    } else {
      usersAheadSchedule.push(eventUser);
    }
  });

  const sort = (userA: EventUser, userB: EventUser) => {
    const userAEtaMs = userA.etaMs;
    const userBEtaMs = userB.etaMs;
    if (userAEtaMs === null) {
      return 1;
    } else if (userBEtaMs === null) {
      return -1;
    }

    return userAEtaMs - userBEtaMs;
  };
  usersAheadSchedule.sort(sort);
  usersBehindSchedule.sort(sort);

  return (
    <div className="EventPageUsers">
      <EventPageUsersGroup
        title="Who's Early"
        eventUsers={usersAheadSchedule}
        startRank={1}
      />
      <EventPageUsersGroup
        title="Who's Late"
        eventUsers={usersBehindSchedule}
        startRank={usersAheadSchedule.length + 1}
      />
    </div>
  );
}

type EventPageUsersGroupProps = {
  title: string;
  eventUsers: Array<EventUser>;
  startRank: number;
};

function EventPageUsersGroup({ title, eventUsers }: EventPageUsersGroupProps) {
  return (
    <div className="EventPageUsers-group">
      <h3 className="EventPageUsers-group-header">{title}</h3>
      {eventUsers.map((eventUser: EventUser) => (
        <EventPageUserCard key={eventUser.name} eventUser={eventUser} />
      ))}
    </div>
  );
}

function buildDescription(
  nowMs: number,
  etaMs: number | null,
  transportMode: TransportMode | null
): string {
  let description = "";
  if (etaMs === null) {
    return "has disabled location sharing.";
  } else {
    const nowMs = new Date().getTime();
    const diffMs = etaMs - nowMs;
    const diffMin = Math.round(diffMs / 1000 / 60);
    if (diffMin > 0) {
      description = `is ${diffMin} min away`;
    } else {
      description = `may have arrived ${Math.abs(diffMin)} min ago`;
    }
  }

  if (transportMode !== null) {
    const action = TRANSPORT_MODE_TO_ACTION[transportMode] || "";
    description = `${description} ${action}`;
  }

  return `${description}.`;
}

interface EventPageRouteParams {
  eventId: string;
}

function EventPageUserCard({ eventUser }: EventPageUserCardProps) {
  const { eventId } = useParams<EventPageRouteParams>();

  function handleMessageClick(eventUser: EventUser, eventId: string) {
    if (!eventUser.phoneNumber) {
      return;
    }
    const eventUrl = `${window.location.origin}/events/${eventId}`;
    const message = `Where the fook are you?`; // TODO: Customize this message based on user's ETA
    window.location.href = `sms:${
      eventUser.phoneNumber
    }  ;?&body=${encodeURIComponent(
      `${message}\n\nSent thru Cobyo\n${eventUrl}`
    )}`;
  }

  return (
    <div key={eventUser.name} className="EventPageUsers-cell">
      <Card className="EventPageUsers-card">
        <div className="EventPageUsers-card-content">
          <Card.Title className="EventPageUsers-card-title">
            {eventUser.name}
          </Card.Title>
          <Card.Text className="EventPageUsers-card-description">
            {buildDescription(
              new Date().getTime(),
              eventUser.etaMs,
              eventUser.transportMode
            )}
          </Card.Text>
        </div>
        <ButtonGroup size="sm" className="EventPageUsers-card-actions">
          <Button variant="link" disabled>
            Info
          </Button>
          <Button
            variant="link"
            onClick={() => handleMessageClick(eventUser, eventId)}
            disabled={!eventUser.phoneNumber}
          >
            Message
          </Button>
        </ButtonGroup>
      </Card>
    </div>
  );
}

type EventPageUserCardProps = {
  eventUser: EventUser;
};

export default EventPageUsers;
