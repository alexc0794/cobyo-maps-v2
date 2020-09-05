import React, { useEffect, useState } from "react";
import PropTypes, { InferProps } from "prop-types";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faSubway, faWalking } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { usePosition } from "use-position";

import { TransportMode } from "../interfaces";
import lyftLogo from "../images/lyft-logo.png";
import "./index.css";

const TRANPSORT_MODE_TO_ICON: {
  [Key in TransportMode]: IconDefinition | string | null;
} = {
  [TransportMode.Walk]: faWalking,
  [TransportMode.Car]: faCar,
  [TransportMode.Transit]: faSubway,
  [TransportMode.Lyft]: lyftLogo
};

function TransportModeSelector({
  initiallySelectedTransportMode,
  googlePlaceId,
  onSelect
}: InferProps<typeof TransportModeSelector.propTypes>) {
  const modes = Object.keys(TransportMode).filter((key: any) =>
    isNaN(Number(key))
  ); // TODO: Get modes from backend

  const [
    selectedTransportMode,
    setSelectedTransportMode
  ] = useState<TransportMode | null>(initiallySelectedTransportMode || null);

  function handleSelect(transportMode: TransportMode) {
    setSelectedTransportMode(transportMode);
    onSelect(transportMode);
  }

  const { latitude, longitude } = usePosition(false);

  return (
    <ButtonGroup className="TransportModeSelector" vertical>
      {modes.map((mode: string) => {
        const transportMode = TransportMode[mode as keyof typeof TransportMode];
        const isSelected = selectedTransportMode === transportMode;
        const icon = TRANPSORT_MODE_TO_ICON[transportMode];
        return (
          <div key={mode} className="TransportModeSelector-mode-wrapper">
            <Button
              className="TransportModeSelector-mode"
              variant="dark"
              onClick={() => handleSelect(transportMode)}
              disabled={isSelected}
            >
              {icon && (
                <div className="TransportModeSelector-mode-icon">
                  {typeof icon === "string" ? (
                    <img height={24} src={icon} alt={icon} />
                  ) : (
                    <FontAwesomeIcon icon={icon} />
                  )}
                </div>
              )}
              <div className="TransportModeSelector-mode-name">{mode}</div>
              <div className="TransportModeSelector-mode-details">
                <TransportModeDetails
                  transportMode={transportMode}
                  latitude={latitude}
                  longitude={longitude}
                  googlePlaceId={googlePlaceId}
                />
              </div>
            </Button>
          </div>
        );
      })}
    </ButtonGroup>
  );
}

TransportModeSelector.propTypes = {
  initiallySelectedTransportMode: PropTypes.oneOf<TransportMode>(
    Object.keys(TransportMode).map(
      key => TransportMode[key as keyof typeof TransportMode]
    )
  ),
  googlePlaceId: PropTypes.string,
  onSelect: PropTypes.func.isRequired
};

TransportModeSelector.defaultProps = {
  initiallySelectedTransportMode: null,
  googlePlaceId: null
};

function getDistance(
  transportMode: TransportMode,
  lat: number,
  lng: number,
  placeId: string
): Promise<number> {
  const TRANSPORT_MODE_TO_TRAVEL_MODE = {
    [TransportMode.Walk]: window.google.maps.TravelMode.WALKING,
    [TransportMode.Car]: window.google.maps.TravelMode.DRIVING,
    [TransportMode.Transit]: window.google.maps.TravelMode.TRANSIT,
    [TransportMode.Lyft]: window.google.maps.TravelMode.DRIVING
  };

  return new Promise((resolve, reject) => {
    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [new window.google.maps.LatLng(lat, lng)],
        destinations: [{ placeId }],
        travelMode: TRANSPORT_MODE_TO_TRAVEL_MODE[transportMode]
      },
      (response, status) => {
        if (status !== "OK") {
          return reject();
        }
        const element = response.rows[0].elements[0];
        if (element.status !== "OK") {
          return reject();
        }
        return resolve(element.duration.value * 1000);
      }
    );
  });
}

function TransportModeDetails({
  transportMode,
  latitude,
  longitude,
  googlePlaceId
}: InferProps<typeof TransportModeDetails.propTypes>) {
  const [durationInMs, setDurationInMs] = useState<number | null>(null);

  async function calculateDistance(
    transportMode: TransportMode,
    latitude: number,
    longitude: number,
    googlePlaceId: string
  ) {
    const durationInMs = await getDistance(
      transportMode,
      latitude,
      longitude,
      googlePlaceId
    );
    setDurationInMs(durationInMs);
  }

  useEffect(() => {
    if (latitude && longitude && googlePlaceId) {
      calculateDistance(transportMode, latitude, longitude, googlePlaceId);
    }
  }, [transportMode, latitude, longitude, googlePlaceId]);

  return (
    <div>
      {durationInMs === null ? (
        <span>Calculating...</span>
      ) : (
        <span>{Math.round(durationInMs / 1000 / 60)} minutes</span>
      )}
    </div>
  );
}

TransportModeDetails.propTypes = {
  transportMode: PropTypes.oneOf<TransportMode>(
    Object.keys(TransportMode).map(
      key => TransportMode[key as keyof typeof TransportMode]
    )
  ).isRequired,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  googlePlaceId: PropTypes.string
};

TransportModeDetails.defaultProps = {
  latitude: null,
  longitude: null,
  googlePlaceId: null
};

export default TransportModeSelector;
