import React, { useState } from "react";
import Select from "react-select";

const ReactSelectComponent = ({options, selectedOption,setSelectedOption}) => {

  const handleChange = (value) => {
    setSelectedOption(value);
  };

  return <Select value={selectedOption} onChange={handleChange} options={options} />;
};

export default ReactSelectComponent;
