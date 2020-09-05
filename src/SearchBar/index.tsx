import React, { useEffect, useState } from "react";
import PropTypes, { InferProps } from "prop-types";
import PlacesAutocomplete from "react-places-autocomplete";
import loadGoogleMapsAPI from "load-google-maps-api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBuilding,
  faCoffee,
  faGlassCheers,
  faHome,
  faMapPin,
  faPlaneDeparture,
  faUniversity,
  faUtensils
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import "./index.css";

const GOOGLE_PLACE_TYPES_TO_IGNORE: Array<string> = [
  "locality",
  "neighborhood",
  "route",
  "administrative_area_level_1"
];

const GOOGLE_PLACE_TYPE_TO_ICON: { [Key: string]: IconDefinition | null } = {
  airport: faPlaneDeparture,
  bar: faGlassCheers,
  cafe: faCoffee,
  establishment: faBuilding,
  food: faUtensils,
  library: faBook,
  locality: null, // A city or town
  neighborhood: faHome,
  premise: faMapPin, // Often with street_address
  restaurant: faUtensils,
  street_address: faMapPin, // Often with premise
  tourist_attraction: null,
  university: faUniversity
};

function SearchBar({
  initialSearchTerm,
  autoFocus,
  placeholder,
  onClick,
  onSelect
}: InferProps<typeof SearchBar.propTypes>) {
  const [isGoogleLoaded, setGoogleLoaded] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);

  useEffect(() => {
    async function load() {
      const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "";
      await loadGoogleMapsAPI({
        key,
        libraries: ["places"]
      });
      setGoogleLoaded(true);
    }
    load();
  }, []);

  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  if (!isGoogleLoaded) {
    return null;
  }

  return (
    <div onClick={onClick}>
      <PlacesAutocomplete
        value={searchTerm}
        onChange={value => setSearchTerm(value)}
        onSelect={(name: string, googlePlaceId: string) => {
          setSearchTerm(name);
          onSelect(name, googlePlaceId);
        }}
      >
        {({
          getInputProps,
          suggestions: unfilteredSuggestions,
          getSuggestionItemProps
        }) => {
          const suggestions = unfilteredSuggestions.filter(suggestion => {
            return (
              suggestion.types.length > 0 &&
              !GOOGLE_PLACE_TYPES_TO_IGNORE.find(
                ignoredType => suggestion.types[0] === ignoredType
              )
            );
          });
          return (
            <div className="SearchBar">
              <input
                {...getInputProps({
                  placeholder: placeholder,
                  className: "SearchBar-input",
                  autoFocus: autoFocus
                })}
              />
              <div>
                {suggestions.map(suggestion => {
                  const icon: IconDefinition | null = suggestion.types.length
                    ? GOOGLE_PLACE_TYPE_TO_ICON[suggestion.types[0]]
                    : null;
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion)}
                      key={suggestion.description}
                      className="SearchBar-suggestion-wrapper"
                    >
                      <div className="SearchBar-suggestion">
                        <div className="SearchBar-suggestion-content">
                          <div className="SearchBar-suggestion-text">
                            <span className="SearchBar-suggestion-text--main">
                              {suggestion.formattedSuggestion.mainText}
                            </span>
                            <span className="SearchBar-suggestion-text--secondary">
                              {suggestion.formattedSuggestion.secondaryText}
                            </span>
                          </div>
                          {icon && (
                            <div className="SearchBar-suggestion-icon">
                              <FontAwesomeIcon icon={icon} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }}
      </PlacesAutocomplete>
    </div>
  );
}

SearchBar.propTypes = {
  initialSearchTerm: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool.isRequired,
  placeholder: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
};

SearchBar.defaultProps = {
  initialSearchTerm: "",
  autoFocus: false,
  placeholder: "Where to today?",
  onClick() {},
  onSelect() {}
};

export default SearchBar;
