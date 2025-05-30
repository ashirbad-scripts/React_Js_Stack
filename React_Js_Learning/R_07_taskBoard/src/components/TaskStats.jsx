import React from 'react';

function TaskStats({ count }) {
  return (
    <div
      style={{
        border: '2px solid black',
        borderRadius: '50px',
        textAlign: 'center',
        fontFamily: 'consolas',
      }}
    >
      <h3>Total task: {count}</h3>
    </div>
  );
}
export default TaskStats;
