import React from "react";
import { Button } from "react-bootstrap";
import FormInput from "./FormInput";
import FormTextArea from "./FormTextArea";

const AccountRequestForm = ({ state, handleFieldChange, handleSubmit }) => {
  const { name, email, password, phone, address, gender } = state;

  return (
    <>
      <form
        className="container"
        style={{ textAlign: "left" }}
        onSubmit={handleSubmit}
      >
        <div className="card">
          <div className="card-header">
            <h1>Account Request</h1>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6">
                <FormInput
                  label="Name"
                  value={name}
                  onChange={(value) => handleFieldChange("name", value)}
                />
              </div>
              <div className="col-lg-6">
                <FormInput
                  label="Email"
                  value={email}
                  onChange={(value) => handleFieldChange("email", value)}
                />
              </div>
              <div className="col-lg-6">
                <FormInput
                  label="Password"
                  value={password}
                  type="password"
                  onChange={(value) => handleFieldChange("password", value)}
                />
              </div>
              <div className="col-lg-6">
                <FormInput
                  label="Phone"
                  value={phone}
                  onChange={(value) => handleFieldChange("phone", value)}
                />
              </div>
              <div className="col-lg-12">
                <FormTextArea
                  label="Address"
                  value={address}
                  onChange={(value) => handleFieldChange("address", value)}
                />
              </div>
              <div className="col-lg-6">
                <FormInput
                  type="radio"
                  label="Gender"
                  value={gender}
                  onChange={(value) => handleFieldChange("gender", value)}
                />
              </div>
            </div>
          </div>
          <div className="card-footer">
            <Button type="submit" style={{ marginRight: "10px" }}>
              Register
            </Button>
            <Button variant="danger">Back</Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AccountRequestForm;
