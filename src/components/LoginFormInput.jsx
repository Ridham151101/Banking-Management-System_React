import React from "react";
import FormInput from "./FormInput";

const LoginFormInput = ({ email, setEmail, password, setPassword }) => {
  return (
    <>
      <FormInput type="text" label="Email" value={email} onChange={setEmail} />
      <FormInput
        type="password"
        label="Password"
        value={password}
        onChange={setPassword}
      />
    </>
  );
};

export default LoginFormInput;
