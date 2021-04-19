import { useState } from "react";

export const useForm = (cb, initialState) => {
  const [values, setValues] = useState(initialState);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    cb();
  };

  return { handleInputChange, handleSubmit, values };
};
