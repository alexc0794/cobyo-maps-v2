import React from "react";
import { useHistory } from "react-router-dom";

import useUser from "../hooks/useUser";
import LoginForm from "../LoginForm";
import SearchBar from "../SearchBar";
import ActiveEvents from "../ActiveEvents";
import RecentEvents from "../RecentEvents";
import { ActiveEvent, RecentEvent } from "../interfaces";
import { SearchResult } from "../CreateEventPage";
import "./index.css";

function HomePage() {
  const history = useHistory();
  const { userId, name, phoneNumber, loginUser } = useUser();
  const isLoggedIn = !!(userId && name && phoneNumber);

  function handleSearchBarClick() {
    history.push("/create");
  }

  function handleActiveEventSelect(activeEvent: ActiveEvent) {
    history.push(`/events/${activeEvent.eventId}`);
  }

  function handleRecentEventSelect(recentEvent: RecentEvent) {
    const searchResult: SearchResult = {
      name: recentEvent.name,
      place: recentEvent.place
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
          <LoginForm
            initialUserId={userId}
            initialName={name}
            initialPhoneNumber={phoneNumber}
            onLogin={loginUser}
          />
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
