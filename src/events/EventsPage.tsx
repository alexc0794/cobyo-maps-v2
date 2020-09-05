import React from "react";
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";

interface EventPageRouteParams {
  eventId: string;
}

function EventPage() {
  let { eventId } = useParams<EventPageRouteParams>();
  return <h1>Event {eventId}</h1>;
}

function EventsPage() {
  let match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/:eventId`}>
        <EventPage />
      </Route>
    </Switch>
  );
}

export default EventsPage;
