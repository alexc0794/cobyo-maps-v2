import React, { useEffect, useState } from "react";
import PropTypes, { InferProps } from "prop-types";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePosition } from "use-position";

import useGoogleMaps from "../hooks/useGoogleMaps";
import { getDistance } from "../helpers";
import { TransportMode } from "../interfaces";
import { TRANSPORT_MODE_TO_ICON } from "../constants";
import "./index.css";

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
        const icon = TRANSPORT_MODE_TO_ICON[transportMode];
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

  const isGoogleLoaded = useGoogleMaps();
  useEffect(() => {
    if (isGoogleLoaded && latitude && longitude && googlePlaceId) {
      calculateDistance(transportMode, latitude, longitude, googlePlaceId);
    }
  }, [transportMode, latitude, longitude, googlePlaceId, isGoogleLoaded]);

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
