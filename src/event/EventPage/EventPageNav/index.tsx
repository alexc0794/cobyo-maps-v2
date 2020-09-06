import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

import "./index.css";

const ABOUT_TAB = "about";
export const CAMERA_TAB = "camera";
const TABS = [ABOUT_TAB, "map", CAMERA_TAB];
const DEFAULT_TAB = ABOUT_TAB;

function EventPageNav() {
  const history = useHistory();
  const match = useRouteMatch();

  function handleSelect(eventKey: string | null) {
    const tab = eventKey || DEFAULT_TAB;
    history.push(`${match.url}/${tab}`);
  }

  return (
    <Nav
      variant="pills"
      className="EventPageNav"
      defaultActiveKey={DEFAULT_TAB}
    >
      {TABS.map(tab => (
        <Nav.Item key={tab}>
          <Nav.Link
            eventKey={tab}
            onSelect={(eventKey: string | null) => handleSelect(eventKey)}
          >
            {`${tab.charAt(0).toUpperCase()}${tab.slice(1)}`}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}

export default EventPageNav;
