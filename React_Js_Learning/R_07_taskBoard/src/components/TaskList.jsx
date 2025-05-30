import React from 'react';

function TaskList({ taskFromCompo, onDelete }) {
  return (
    <div>
      <h3>Tasks</h3>
      <ul>
        {taskFromCompo.map((item, index) => (
          <li
            key={index}
            style={{
              padding: '5px 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '250px',
            }}
          >
            <span style={{ fontSize: '20px' }}>{item}</span>
            <button
              style={{
                marginLeft: '25px',
                border: '2px solid red',
                borderRadius: '10px',
                padding: '7px',
              }}
              onClick={() => onDelete(index)}
            >
              DELETE
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
