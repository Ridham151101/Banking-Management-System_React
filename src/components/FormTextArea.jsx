import React from "react";

const FormTextArea = ({ label, value, onChange }) => {
  return (
    <div className="form-group mb-3">
      <label>
        {label} <span style={{ color: "red" }}>*</span>
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-control"
      />
    </div>
  );
};

export default FormTextArea;
