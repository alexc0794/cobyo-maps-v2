import React, { useEffect } from "react";
import {
  Switch,
  Redirect,
  Route,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchEvent } from "../actions";
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
import LoginForm from "../../user/LoginForm";
import "./index.css";

interface EventPageRouteParams {
  eventId: string;
}

function EventPage() {
  const { eventId } = useParams<EventPageRouteParams>();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const event = useSelector(selectEvent);
  const loading = !event;
  const error = false;
  const isLoggedIn = !!token;

  useEffect(() => {
    dispatch(fetchEvent(eventId, token));
  }, [dispatch, eventId, token]);

  // function handleLogin(phoneNumber: string, name: string) {
  //   dispatch(login(phoneNumber, name));
  // }

  let match = useRouteMatch();

  return (
    <div className="EventPage">
      {!event && loading && <p>Loading</p>}
      {!event && error && <p>An error occurred</p>}
      {event && (
        <>
          {isLoggedIn ? (
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
          ) : (
            <>
              <EventPageHeader event={event} />
              <LoginForm
                initialName=""
                initialPhoneNumber=""
                onLogin={(args) => dispatch(login(args))}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default EventPage;
