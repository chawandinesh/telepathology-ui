import React, { useState } from "react";
import Select from "react-select";

const ReactSelectComponent = ({options, selectedOption,setSelectedOption, getVal}) => {
  const [value, setValue] = useState('')
  const handleChange = (value) => {
    setSelectedOption(value);
  };
  getVal(value)

  return <Select onInputChange={e => setValue(e)} value={selectedOption} onChange={handleChange} options={options} />;
};

export default ReactSelectComponent;
