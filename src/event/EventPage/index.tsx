import React, { useEffect } from "react";
import {
  Switch,
  Redirect,
  Route,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Event, TransportMode } from "../../interfaces";
import { fetchEvent, joinEvent } from "../actions";
import { selectEvent } from "../selectors";
import { login } from "../../user/actions";
import { selectToken } from "../../user/selectors";
import EventPageTimer from "./EventPageTimer";
import EventPageHeader from "./EventPageHeader";
import EventPageNav from "./EventPageNav";
import EventPageSchedule from "./EventPageSchedule";
import EventPageUsers from "./EventPageUsers";
import EventPageMap from "./EventPageMap";
import EventPageSettings from "./EventPageSettings";
import LoginForm, { LoginInfo } from "../../user/LoginForm";
import TransportModeSelector from "../../TransportModeSelector";
import "./index.css";

interface EventPageRouteParams {
  eventId: string;
}

export default function EventPage() {
  const { eventId } = useParams<EventPageRouteParams>();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const event = useSelector(selectEvent);
  const loading = !event;
  const error = false;

  useEffect(() => {
    dispatch(fetchEvent(eventId, token));
  }, [dispatch, eventId, token]);

  let match = useRouteMatch();
  return (
    <div className="EventPage">
      {!event && loading && <p>Loading</p>}
      {!event && error && <p>An error occurred</p>}
      {event &&
        (() => {
          const authenticated = !!token;
          const authorized = !!event.me;

          if (!authenticated) {
            return <EventPageUnauthenticated event={event} />;
          }

          if (!authorized) {
            return <EventPageUnauthorized event={event} />;
          }

          return (
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
                <Route>
                  <Redirect to={`${match.url}/about`} />
                </Route>
              </Switch>
            </>
          );
        })()}
    </div>
  );
}

type EventPageUnauthenticatedProps = {
  event: Event;
};

function EventPageUnauthenticated({ event }: EventPageUnauthenticatedProps) {
  const dispatch = useDispatch();

  function handleLogin(loginInfo: LoginInfo) {
    dispatch(login(loginInfo));
  }

  return (
    <>
      <EventPageHeader event={event} />
      <LoginForm onLogin={handleLogin} />
    </>
  );
}

type EventPageUnauthorizedProps = {
  event: Event;
};

function EventPageUnauthorized({ event }: EventPageUnauthorizedProps) {
  const dispatch = useDispatch();

  function handleTransportModeSelect(transportMode: TransportMode) {
    dispatch(joinEvent(event.eventId, transportMode));
  }

  return (
    <>
      <EventPageHeader event={event} />
      <div className="EventPage-join">
        <TransportModeSelector
          googlePlaceId={event.place.googlePlaceId}
          onSelect={handleTransportModeSelect}
        />
      </div>
    </>
  );
}
