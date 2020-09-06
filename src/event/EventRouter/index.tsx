import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { CAMERA_TAB } from "../EventPage/EventPageNav";

import EventPage from "../EventPage";

function EventRouter() {
  let match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/:eventId/${CAMERA_TAB}`}>
        Do some camera AR shit
      </Route>
      <Route path={`${match.path}/:eventId`}>
        <EventPage />
      </Route>
    </Switch>
  );
}

export default EventRouter;
