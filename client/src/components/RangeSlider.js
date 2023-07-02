import React, { useState } from 'react';

function RangeSlider() {
  const [value, setValue] = useState(5);

  const handleChange = (event) => {
    setValue(event.target.value);
   
  };

  

  return (
    <div>
      <input
        type="range"
        min="0"
        max="10"
        value={value}
        onChange={handleChange}
      />
      <p>Selected value: {value}</p>
    </div>
  );
}

export default RangeSlider;