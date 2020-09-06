import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Location } from "history";
import Button from "react-bootstrap/Button";

import SearchBar from "../SearchBar";
import TransportModeSelector from "../TransportModeSelector";
import RecentEvents from "../RecentEvents";
import { TransportMode, RecentEvent, Place } from "../interfaces";
import "./index.css";

interface SearchResult {
  name: string;
  place: Place;
}

function getQuerySearchResult(location: Location): SearchResult | null {
  const query = new URLSearchParams(location.search);
  const name = query.get("name");
  const latitude = query.get("latitude");
  const longitude = query.get("longitude");
  const googlePlaceId = query.get("googlePlaceId");

  if (
    name === null ||
    latitude === null ||
    isNaN(parseFloat(latitude)) ||
    longitude === null ||
    isNaN(parseFloat(longitude)) ||
    googlePlaceId === null
  ) {
    return null;
  }

  return {
    name,
    place: {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      googlePlaceId: googlePlaceId as string
    }
  };
}

function CreateEventPage() {
  const history = useHistory();
  const querySearchResult: SearchResult | null = getQuerySearchResult(
    useLocation()
  );

  const [initialSearchTerm, setInitialSearchTerm] = useState<string>(
    querySearchResult ? querySearchResult.name : ""
  );
  const [searchResult, setSearchResult] = useState<SearchResult | null>(
    querySearchResult
  );
  const [transportMode, setTransportMode] = useState<TransportMode | null>(
    null
  );

  function handleSearchBarSelect(name: string, place: Place) {
    if (document.activeElement) {
      try {
        (document.activeElement as HTMLElement).blur();
      } catch (error) {
        console.error(error);
      }
    }
    setSearchResult({ name, place });
  }

  function handleTransportModeSelect(transportMode: TransportMode) {
    setTransportMode(transportMode);
  }

  async function handleContinueClick() {
    console.log("Continuing with", transportMode, searchResult);
    await Promise.resolve(); // TODO: Hook up with backend
    history.push(`/events/${1}`);
  }

  function handleCancelClick() {
    history.push("/");
  }

  function handleRecentEventSelect(recentEvent: RecentEvent) {
    const searchResult: SearchResult = {
      name: recentEvent.name,
      place: recentEvent.place
    };
    // No need to assume inheritance of the transport mode
    setSearchResult(searchResult);
    setInitialSearchTerm(searchResult.name);
  }

  return (
    <>
      <SearchBar
        initialSearchTerm={initialSearchTerm}
        autoFocus
        onSelect={handleSearchBarSelect}
      />
      {searchResult && (
        <>
          <TransportModeSelector
            googlePlaceId={searchResult.place.googlePlaceId}
            onSelect={handleTransportModeSelect}
          />
        </>
      )}
      <div className="CreateEventPage-button-wrapper">
        <div className="CreateEventPage-button-group">
          {searchResult &&
            (transportMode !== null ? (
              <Button size="lg" variant="primary" onClick={handleContinueClick}>
                Continue
              </Button>
            ) : (
              <Button size="lg" variant="warning" onClick={handleContinueClick}>
                Continue without a mode
              </Button>
            ))}
          <Button size="lg" variant="link" onClick={handleCancelClick}>
            Cancel
          </Button>
        </div>
      </div>
      {!searchResult && <RecentEvents onSelect={handleRecentEventSelect} />}
    </>
  );
}

export default CreateEventPage;
