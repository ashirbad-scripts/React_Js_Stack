import React from 'react';

function Input({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Enter your name"
      value={value}
      onChange={onChange}
      style={{ padding: '8px', marginBottom: '10px' }}
    />
  );
}

export default Input;
