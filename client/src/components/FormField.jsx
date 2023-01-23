import React from "react";
import "./style.css";
import { CiImageOn } from "react-icons/ci";
const FormField = ({
  LableName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <>
      <div className="form-field-container">
        <label htmlFor={name}>{LableName}</label>
        {isSurpriseMe && (
          <button
            className="surpriseMe-btn"
            type="button"
            onClick={handleSurpriseMe}
          >
            Surprise me
          </button>
        )}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        required
          />
          
    </>
  );
};

export default FormField;
