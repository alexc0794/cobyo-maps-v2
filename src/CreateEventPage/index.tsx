import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Location } from "history";
import Button from "react-bootstrap/Button";

import SearchBar from "../SearchBar";
import TransportModeSelector from "../TransportModeSelector";
import RecentEvents from "../RecentEvents";
import { TransportMode, RecentEvent, Place } from "../interfaces";
import "./index.css";

export interface SearchResult {
  name: string;
  place: Place;
}

function determineIfValidSearchResult(obj: object): obj is SearchResult {
  if ((obj as SearchResult).name && (obj as SearchResult).place) {
    return true;
  }
  return false;
}

function getQuerySearchResult(location: Location): SearchResult | null {
  const query = new URLSearchParams(location.search);
  const searchResultParam: string | null = query.get("search") || null;
  const searchResultObj: object | null = searchResultParam
    ? JSON.parse(searchResultParam)
    : null;
  const searchResult: SearchResult | null = searchResultObj
    ? determineIfValidSearchResult(searchResultObj)
      ? searchResultObj
      : null
    : null;

  return searchResult;
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
