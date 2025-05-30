import React from 'react';

function Button({ onClick }) {
  return (
    <button onClick={onClick} style={{ padding: '8px 16px' }}>
      Reset
    </button>
  );
}

export default Button;
