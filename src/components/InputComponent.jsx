// Input.js
import React from "react";

const Input = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  onBlur,
}) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
  />
);

export default Input;
