import React, { useState } from "react";
import Select from "react-select";

const ReactSelectComponent = ({options, selectedOption,setSelectedOption, getVal}) => {
  const [value, setValue] = useState('')
  const handleChange = (value) => {
    setSelectedOption(value);
  };
  getVal(value)

  return (
    <Select
      styles={{
        option: (provided, state) => ({
          ...provided,
          borderBottom: "1px dotted pink",
          color: state.isSelected ? "white" : "blue",
          cursor: "pointer",
        }),
      }}
      onInputChange={(e) => setValue(e)}
      value={selectedOption}
      onChange={handleChange}
      options={options}
    />
  );
};

export default ReactSelectComponent;
