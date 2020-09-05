import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import EventPage from "../EventPage";

function EventRouter() {
  let match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/:eventId`}>
        <EventPage />
      </Route>
    </Switch>
  );
}

export default EventRouter;
