import React from 'react';

function MoodButton({ mood, onSelect }) {
  return (
    <button
      onClick={() => onSelect(mood)}
      style={{
        margin: '10px',
        padding: '10px 20px',
        fontSize: '16px',
      }}
    >
      {mood}
    </button>
  );
}
export default MoodButton;
