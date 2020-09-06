import { faCar, faSubway, faWalking } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import { TransportMode } from "./interfaces";
import lyftLogo from "./images/lyft-logo.png";

export const TRANSPORT_MODE_TO_ICON: {
  [Key in TransportMode]: IconDefinition | string | null;
} = {
  [TransportMode.Walk]: faWalking,
  [TransportMode.Car]: faCar,
  [TransportMode.Transit]: faSubway,
  [TransportMode.Lyft]: lyftLogo
};

// Used in context of "Alex is X min away ${action}"
// Also in context of "Alex may have arrived X min ago ${action}"
export const TRANSPORT_MODE_TO_ACTION: {
  [Key in TransportMode]: string | null;
} = {
  [TransportMode.Walk]: "walking",
  [TransportMode.Car]: "in a car",
  [TransportMode.Transit]: "on public transit",
  [TransportMode.Lyft]: "in a Lyft"
};
