import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LoginForm from "../user/LoginForm";
import { login } from "../user/actions";
import { selectToken } from "../user/selectors";
import SearchBar from "../SearchBar";
import ActiveEvents from "../ActiveEvents";
import RecentEvents from "../RecentEvents";
import { ActiveEvent, RecentEvent } from "../interfaces";
import { SearchResult } from "../CreateEventPage";
import "./index.css";

function HomePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(selectToken);
  const isLoggedIn = !!token;

  function handleSearchBarClick() {
    history.push("/create");
  }

  function handleActiveEventSelect(activeEvent: ActiveEvent) {
    history.push(`/events/${activeEvent.eventId}`);
  }

  function handleRecentEventSelect(recentEvent: RecentEvent) {
    const searchResult: SearchResult = {
      name: recentEvent.name,
      place: recentEvent.place,
    };

    const queryString = `search=${encodeURIComponent(
      JSON.stringify(searchResult)
    )}`;
    history.push(`/create?${queryString}`);
  }

  if (!isLoggedIn) {
    return (
      <>
        <div className="HomePage-logo"></div>
        <div className="HomePage-login">
          <LoginForm onLogin={(args) => dispatch(login(args))} />
        </div>
      </>
    );
  }

  return (
    <>
      <SearchBar onClick={handleSearchBarClick} />
      <ActiveEvents onSelect={handleActiveEventSelect} />
      <RecentEvents onSelect={handleRecentEventSelect} />
    </>
  );
}

export default HomePage;
