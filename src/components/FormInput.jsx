import React from "react";

const FormInput = ({ type, label, value, onChange }) => {
  return (
    <div className="form-group">
      <label>
        {label} <span className="errmsg">*</span>
      </label>
      {type === "radio" ? (
        <div id="gender-field" className="mb-3">
          <input
            type="radio"
            id="radio-button"
            checked={value === "male"}
            onChange={() => onChange("male")}
            value="male"
            className="app-check"
          />
          <label>Male</label>
          <input
            type="radio"
            id="radio-button"
            checked={value === "female"}
            onChange={() => onChange("female")}
            value="female"
            className="app-check"
          />
          <label>Female</label>
        </div>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="form-control mb-3"
        />
      )}
    </div>
  );
};

export default FormInput;
