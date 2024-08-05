import React, { useState } from "react";

// Higher-Order Component for input validation
const withInputValidation = (WrappedComponent) => {
  return ({ name, ...props }) => {
    const [error, setError] = useState("");

    const validate = (value) => {
      if (!value.trim()) {
        setError(`${name} cannot be empty`);
      } else {
        setError("");
      }
    };

    const handleChange = (e) => {
      const { value } = e.target;
      validate(value);
      if (props.onChange) {
        props.onChange(e);
      }
    };

    return (
      <div>
        <WrappedComponent {...props} name={name} onChange={handleChange} />
        {error && <p className="error">{error}</p>}
      </div>
    );
  };
};

// Basic input component
const Input = ({ type = "text", name, placeholder }) => (
  <input type={type} name={name} placeholder={placeholder} />
);

// Enhanced input with validation
const ValidatedInput = withInputValidation(Input);

// Form component using the enhanced inputs
const FormComponent = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <ValidatedInput name="username" placeholder="Username" />
      <ValidatedInput name="email" type="email" placeholder="Email" />
      <ValidatedInput name="password" type="password" placeholder="Password" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
