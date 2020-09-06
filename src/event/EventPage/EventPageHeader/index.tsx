import React from "react";

import { Event } from "../../../interfaces";
import "./index.css";

function EventPageHeader({ event }: EventPageHeaderProps) {
  let headerText, subheaderText;

  if (event.place.mainText && event.place.secondaryText) {
    headerText = event.place.mainText;
    subheaderText = event.place.secondaryText;
  } else if (event.place.mainText) {
    headerText = event.place.mainText;
    subheaderText = "";
  } else {
    headerText = event.name;
    subheaderText = "";
  }

  return (
    <div className="EventPageHeader">
      <h2 className="EventPageHeader--header">{headerText}</h2>
      <h3 className="EventPageHeader--subheader">{subheaderText}</h3>
    </div>
  );
}

type EventPageHeaderProps = {
  event: Event;
};

export default EventPageHeader;
