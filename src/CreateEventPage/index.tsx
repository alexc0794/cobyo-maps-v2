import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import SearchBar from "../SearchBar";
import TransportModeSelector from "../TransportModeSelector";
import RecentEvents from "../RecentEvents";
import { TransportMode, RecentEvent } from "../interfaces";
import "./index.css";

interface SearchResult {
  name: string;
  googlePlaceId: string;
}

function CreateEventPage() {
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  const querySearchTerm = query.get("searchTerm");
  const queryPlaceId = query.get("placeId");
  const [initialSearchTerm, setInitialSearchTerm] = useState<string>(
    querySearchTerm || ""
  );
  const [searchResult, setSearchResult] = useState<SearchResult | null>(
    querySearchTerm && queryPlaceId
      ? {
          name: querySearchTerm,
          googlePlaceId: queryPlaceId
        }
      : null
  );
  const [transportMode, setTransportMode] = useState<TransportMode | null>(
    null
  );

  function handleSearchBarSelect(name: string, googlePlaceId: string) {
    if (document.activeElement) {
      try {
        (document.activeElement as HTMLElement).blur();
      } catch (error) {
        console.error(error);
      }
    }
    setSearchResult({ name, googlePlaceId });
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
      googlePlaceId: recentEvent.googlePlaceId
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
            googlePlaceId={searchResult.googlePlaceId}
            onSelect={handleTransportModeSelect}
          />
        </>
      )}
      <div className="CreateEventPage-button-wrapper">
        <ButtonGroup size="lg" vertical>
          {searchResult &&
            (transportMode !== null ? (
              <Button variant="primary" onClick={handleContinueClick}>
                Continue
              </Button>
            ) : (
              <Button variant="warning" onClick={handleContinueClick}>
                Continue without a mode
              </Button>
            ))}
          <Button variant="link" onClick={handleCancelClick}>
            Cancel
          </Button>
        </ButtonGroup>
      </div>
      {!searchResult && <RecentEvents onSelect={handleRecentEventSelect} />}
    </>
  );
}

export default CreateEventPage;
