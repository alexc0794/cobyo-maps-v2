import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Event } from "../../interfaces";
import { MOCK_EVENT } from "../../mocks";
import "./index.css";

interface EventPageRouteParams {
  eventId: string;
}

function EventPage() {
  let { eventId } = useParams<EventPageRouteParams>();
  const [event, setEvent] = useState<Event | null>(null);

  async function loadEvent(eventId: string) {
    const event: Event | null = await Promise.resolve(MOCK_EVENT); // TODO: Replace with an actual server call
    setEvent(event);
  }

  useEffect(() => {
    loadEvent(eventId);
  }, [eventId]);

  return (
    <div className="EventPage">
      {!event && <p>Loading</p>}
      {event && (
        <>
          <div className="EventPage-header-wrapper">
            <h2 className="EventPage-header">{event.name}</h2>
          </div>
        </>
      )}
    </div>
  );
}

export default EventPage;
