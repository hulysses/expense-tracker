import React from "react";
import "./styles.css";

const Button = ({ Text, onClick, Type = "button", styleType = "button-default" }) => {
  return (
    <button type={Type} onClick={onClick} className={`button ${styleType}`}>
      {Text}
    </button>
  );
};

export default Button;
