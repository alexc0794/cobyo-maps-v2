import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Location } from "history";
import Button from "react-bootstrap/Button";

import SearchBar from "../SearchBar";
import TransportModeSelector from "../TransportModeSelector";
import RecentEvents from "../RecentEvents";
import { createEvent } from "../event/actions";
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
  const dispatch = useDispatch();
  const querySearchResult: SearchResult | null = getQuerySearchResult(
    useLocation()
  );

  const [initialSearchTerm, setInitialSearchTerm] = useState<string>(
    querySearchResult ? querySearchResult.name : ""
  );
  const [searchResult, setSearchResult] = useState<SearchResult | null>(
    querySearchResult
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

  async function handleTransportModeSelect(transportMode: TransportMode) {
    if (!searchResult) {
      return;
    }

    try {
      const eventId = await dispatch(
        createEvent(searchResult.name, searchResult.place, transportMode)
      );
      history.push(`/events/${eventId}`);
    } catch (error) {
      console.error(error);
    }
  }

  function handleCancelClick() {
    history.push("/");
  }

  function handleRecentEventSelect(recentEvent: RecentEvent) {
    const searchResult: SearchResult = {
      name: recentEvent.name,
      place: recentEvent.place,
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
        <TransportModeSelector
          googlePlaceId={searchResult.place.googlePlaceId}
          onSelect={handleTransportModeSelect}
        />
      )}
      <div className="CreateEventPage-button-wrapper">
        <div className="CreateEventPage-button-group">
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
