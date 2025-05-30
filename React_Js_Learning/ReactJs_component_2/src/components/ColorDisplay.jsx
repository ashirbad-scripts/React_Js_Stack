import React from 'react';

function ColorDisplay({ color }) {
  return (
    <div
      style={{
        height: '100px',
        width: '100px',
        border: '2px solid black',
        margin: 'auto',
        marginBottom: '20px',
        backgroundColor: color,
      }}
    ></div>
  );
}
export default ColorDisplay;
