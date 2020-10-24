import React from "react";
import { Switch, Redirect, Route, useRouteMatch } from "react-router-dom";

import { CAMERA_TAB } from "../EventPage/EventPageNav";
import CameraPage from "../../ar/CameraPage";

import EventPage from "../EventPage";

function EventRouter() {
  let match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/:eventId/${CAMERA_TAB}`}>
        <EventPage />
      </Route>
      <Route path={`${match.path}/:eventId`}>
        <EventPage />
      </Route>
    </Switch>
  );
}

export default EventRouter;
