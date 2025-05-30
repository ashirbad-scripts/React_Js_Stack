import React from 'react';

function ColorInput({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Enter a color"
      style={{ padding: '10px', width: '250px' }}
    />
  );
}
export default ColorInput;
