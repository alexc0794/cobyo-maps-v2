import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import CreateEventPage from "./CreateEventPage";
import EventsPage from "./events/EventsPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/create" component={CreateEventPage} />
        <Route path="/events" component={EventsPage} />
      </Switch>
    </Router>
  );
}

export default App;
