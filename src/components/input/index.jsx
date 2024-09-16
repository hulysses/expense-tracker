import React from "react";
import "./styles.css";

const Input = ({ type, placeholder, value, onChange, label }) => {
  return (
    <div className="input-container">
      {label && <label className="input-label">{label}</label>}
      <input
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="input-default"
      />
    </div>
  );
};

export default Input;