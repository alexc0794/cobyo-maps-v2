import React from "react";
import { useHistory } from "react-router-dom";
import SearchBar from "../SearchBar";
import ActiveEvents from "../ActiveEvents";
import RecentEvents from "../RecentEvents";
import { ActiveEvent, RecentEvent } from "../interfaces";

function HomePage() {
  const history = useHistory();

  function handleSearchBarClick() {
    history.push("/create");
  }

  function handleActiveEventSelect(activeEvent: ActiveEvent) {
    history.push(`/events/${activeEvent.eventId}`);
  }

  function handleRecentEventSelect(recentEvent: RecentEvent) {
    const placeQueryString = Object.keys(recentEvent.place)
      .map(
        (key: string) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(
            (recentEvent.place as any)[key]
          )}`
      )
      .join("&");
    const queryString = `name=${encodeURIComponent(
      recentEvent.name
    )}&${placeQueryString}`;
    history.push(`/create?${queryString}`);
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
