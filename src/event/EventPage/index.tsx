import React, { useEffect, useState } from "react";
import {
  Switch,
  Redirect,
  Route,
  useParams,
  useRouteMatch
} from "react-router-dom";

import EventPageTimer from "./EventPageTimer";
import EventPageHeader from "./EventPageHeader";
import EventPageNav from "./EventPageNav";
import EventPageSchedule from "./EventPageSchedule";
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

  let match = useRouteMatch();

  return (
    <div className="EventPage">
      {!event && <p>Loading</p>}
      {event && (
        <>
          <EventPageTimer event={event} />
          <EventPageHeader event={event} />
          <EventPageNav />
          <Switch>
            <Route exact path={`${match.path}/map`}></Route>
            <Route exact path={`${match.path}/about`}>
              <EventPageSchedule event={event} />
            </Route>
            <Route>
              <Redirect to={`${match.url}/about`} />
            </Route>
          </Switch>
        </>
      )}
    </div>
  );
}

export default EventPage;
