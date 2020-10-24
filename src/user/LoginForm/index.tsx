import React, { useState, ChangeEvent } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import usePhoneNumber from "../../hooks/usePhoneNumber";
import "./index.css";

type LoginFormProps = {
  initialName: string | null;
  initialPhoneNumber: string | null;
  onLogin: ({
    phoneNumber,
    name,
  }: {
    phoneNumber: string;
    name: string;
  }) => void;
};

function LoginForm({
  initialName,
  initialPhoneNumber,
  onLogin,
}: LoginFormProps) {
  const [name, setName] = useState<string>(initialName || "");
  const {
    phoneNumber,
    isPhoneNumberValid,
    onChangePhoneNumber,
  } = usePhoneNumber(initialPhoneNumber);
  const isLoginValid = !!name && isPhoneNumberValid;

  function handleChangeName(event: ChangeEvent<HTMLInputElement>) {
    let re = /^[a-zA-Z]+$/;
    const input = event.target.value;
    if (input === "" || (re.test(input) && input.length <= 20)) {
      setName(input);
    }
  }

  async function handleSubmit() {
    console.log(`Logging in as ${name}: ${phoneNumber}`);
    onLogin({ phoneNumber, name });
  }

  return (
    <div className="LoginForm">
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>Name</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          size="lg"
          type="text"
          placeholder={initialName || ""}
          onChange={handleChangeName}
          value={name}
        />
      </InputGroup>

      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>Phone</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          size="lg"
          type="tel"
          placeholder={initialPhoneNumber || ""}
          onChange={onChangePhoneNumber}
          value={phoneNumber}
        />
      </InputGroup>

      <div className="LoginForm-submit">
        <Button size="lg" disabled={!isLoginValid} onClick={handleSubmit}>
          Sign in
        </Button>
      </div>
    </div>
  );
}

export default LoginForm;
