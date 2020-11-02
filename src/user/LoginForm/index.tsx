import React, { useState, ChangeEvent } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import usePhoneNumber from "../../hooks/usePhoneNumber";
import "./index.css";

type LoginFormProps = {
  onLogin: ({ phoneNumber, name }: LoginInfo) => void;
};

export type LoginInfo = {
  phoneNumber: string;
  name: string;
};

const localStorageLoginInfo = window.localStorage.getItem("login");
const initialLoginInfo: LoginInfo | null = localStorageLoginInfo
  ? JSON.parse(localStorageLoginInfo)
  : null;

function LoginForm({ onLogin }: LoginFormProps) {
  const initialName = initialLoginInfo ? initialLoginInfo.name : null;
  const initialPhoneNumber = initialLoginInfo
    ? initialLoginInfo.phoneNumber
    : null;
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
    const loginInfo: LoginInfo = { phoneNumber, name };
    window.localStorage.setItem("login", JSON.stringify(loginInfo));
    onLogin(loginInfo);
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
