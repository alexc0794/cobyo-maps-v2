import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import usePosition from "../hooks/usePosition";
import useGoogleMaps from "../hooks/useGoogleMaps";
import { getDistance } from "../helpers";
import { TransportMode, Position } from "../interfaces";
import { TRANSPORT_MODE_TO_ICON } from "../constants";
import "./index.css";

type TransportModeSelectorProps = {
  initiallySelectedTransportMode?: TransportMode;
  googlePlaceId?: string;
  onSelect: (transportMode: TransportMode) => void;
};

function TransportModeSelector({
  initiallySelectedTransportMode,
  googlePlaceId,
  onSelect
}: TransportModeSelectorProps) {
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

type TransportModeDetailsProps = {
  transportMode: TransportMode;
  googlePlaceId?: string;
};

function TransportModeDetails({
  transportMode,
  googlePlaceId
}: TransportModeDetailsProps) {
  const [durationInMs, setDurationInMs] = useState<number | null>(null);
  const { position } = usePosition(null, null);

  async function calculateDistance(
    transportMode: TransportMode,
    position: Position,
    googlePlaceId: string
  ) {
    const durationInMs = await getDistance(
      transportMode,
      position,
      googlePlaceId
    );
    setDurationInMs(durationInMs);
  }

  const isGoogleLoaded = useGoogleMaps();
  useEffect(() => {
    if (isGoogleLoaded && position && googlePlaceId) {
      calculateDistance(transportMode, position, googlePlaceId);
    }
  }, [transportMode, position, googlePlaceId, isGoogleLoaded]);

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

export default TransportModeSelector;
