import React, { useState } from "react";

const withErrorHandling = (WrappedComponent) => {
  return function WithErrorHandling(props) {
    const [error, setError] = useState("");

    const validate = (value) => {
      if (!value.trim()) {
        setError("This field is required");
      } else {
        setError("");
      }
      // You can add more validation rules here
    };

    const handleChange = (e) => {
      const { value } = e.target;
      validate(value);
      if (props.onChange) {
        props.onChange(e);
      }
    };

    const handleBlur = (e) => {
      const { value } = e.target;
      validate(value);
      if (props.onBlur) {
        props.onBlur(e);
      }
    };

    return (
      <div>
        <WrappedComponent
          {...props}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {error && <span style={{ color: "red" }}>{error}</span>}
      </div>
    );
  };
};

export default withErrorHandling;
