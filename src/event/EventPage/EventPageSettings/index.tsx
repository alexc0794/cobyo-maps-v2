import React, { useState, ChangeEvent } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import usePosition from "../../../hooks/usePosition";
import { Event } from "../../../interfaces";
import "./index.css";

type EventPageSettingsProps = {
  event: Event;
};

function EventPageSettings({ event }: EventPageSettingsProps) {
  const { isLocationSharingEnabled, setIsLocationSharingEnabled } = usePosition(
    event.me,
    event.eventId
  );

  const [
    localIsLocationSharingEnabled,
    setLocalIsLocationSharingEnabled
  ] = useState<boolean>(isLocationSharingEnabled);

  function handleChangeLocationSharing() {
    setLocalIsLocationSharingEnabled(!localIsLocationSharingEnabled);
  }

  const initialPhoneNumber =
    event.me && event.me.phoneNumber ? event.me.phoneNumber : "";

  const [phoneNumber, setPhoneNumber] = useState<string>(initialPhoneNumber);

  function handleChangePhoneNumber(event: ChangeEvent<HTMLInputElement>) {
    let re = /^(0|[1-9][0-9]*)$/;
    const input = event.target.value;
    if (re.test(input) && input.length <= 10) {
      setPhoneNumber(input);
    }
  }

  function handleSubmit() {
    setIsLocationSharingEnabled(localIsLocationSharingEnabled);
  }

  if (!event.me) {
    return null;
  }

  const detectedChanges =
    initialPhoneNumber !== phoneNumber ||
    localIsLocationSharingEnabled !== isLocationSharingEnabled;

  const isPhoneNumberValid = (() => {
    if (phoneNumber.length !== 10) {
      return false;
    }
    return true;
  })();

  const isSubmitDisabled = !detectedChanges || !isPhoneNumberValid;

  return (
    <Form className="EventPageSettings">
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Name
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="input" defaultValue={event.me.name} disabled />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Phone number
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="input"
            value={phoneNumber}
            onChange={handleChangePhoneNumber}
          />
        </Col>
      </Form.Group>
      <Form.Group>
        <Form.Check
          type="switch"
          id="location-sharing"
          label="Allow location sharing"
          checked={localIsLocationSharingEnabled}
          onChange={handleChangeLocationSharing}
        />
      </Form.Group>
      <Form.Group className="EventPageSettings-submit">
        <Button
          size="lg"
          disabled={isSubmitDisabled}
          variant={isSubmitDisabled ? "outline-secondary" : "primary"}
          onClick={handleSubmit}
        >
          {detectedChanges ? "Submit changes" : "No changes made"}
        </Button>
      </Form.Group>
    </Form>
  );
}

export default EventPageSettings;
