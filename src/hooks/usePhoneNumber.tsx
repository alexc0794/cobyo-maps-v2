import { useState, ChangeEvent } from "react";

export default function(initialPhoneNumber: string | null) {
  const [phoneNumber, setPhoneNumber] = useState<string>(
    initialPhoneNumber || ""
  );

  function onChangePhoneNumber(event: ChangeEvent<HTMLInputElement>) {
    let re = /^(0|[1-9][0-9]*)$/;
    const input = event.target.value;
    if (input === "" || (re.test(input) && input.length <= 10)) {
      setPhoneNumber(input);
    }
  }

  const isPhoneNumberValid: boolean = (() => {
    if (phoneNumber.length !== 10) {
      return false;
    }
    return true;
  })();

  return {
    phoneNumber,
    onChangePhoneNumber,
    isPhoneNumberValid
  };
}
