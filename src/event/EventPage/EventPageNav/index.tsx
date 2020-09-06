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

  const defaultActiveKey = (() => {
    // A little hack to set the correct tab to active if the tab name is found in the URL
    const tab = TABS.find(tab =>
      window.location.href.includes(tab.toLowerCase())
    );
    return tab || DEFAULT_TAB;
  })();

  return (
    <Nav
      variant="pills"
      className="EventPageNav"
      defaultActiveKey={defaultActiveKey}
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
