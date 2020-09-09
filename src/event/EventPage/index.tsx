import React from "react";
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
import EventPageUsers from "./EventPageUsers";
import EventPageMap from "./EventPageMap";
import EventPageSettings from "./EventPageSettings";
import useEvent from "../../hooks/useEvent";
import { Event } from "../../interfaces";
import "./index.css";

interface EventPageRouteParams {
  eventId: string;
}

function EventPage() {
  let { eventId } = useParams<EventPageRouteParams>();
  const {
    event,
    error,
    loading
  }: { event: Event | null; error: boolean; loading: boolean } = useEvent(
    eventId
  );

  let match = useRouteMatch();

  return (
    <div className="EventPage">
      {!event && loading && <p>Loading</p>}
      {!event && error && <p>An error occurred</p>}
      {event && (
        <>
          <EventPageTimer event={event} />
          <EventPageHeader event={event} />
          <EventPageNav />
          <Switch>
            <Route path={`${match.path}/map`}>
              <EventPageMap event={event} />
            </Route>
            <Route path={`${match.path}/about`}>
              <EventPageSchedule event={event} />
              <EventPageUsers event={event} />
            </Route>
            <Route path={`${match.path}/settings`}>
              <EventPageSettings event={event} />
            </Route>
            // If no paths match, default to /about
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
