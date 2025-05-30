import React, { useState } from 'react';

function StatusCard({ data }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div>
      <h3>
        <span
          onClick={() => setShowDetails(!showDetails)}
          style={{ cursor: 'pointer' }}
        >
          {data.statusCode} - {data.statusMessage}
        </span>
      </h3>

      {showDetails && (
        <>
          <p>
            <strong style={{ color: 'red' }}>Category:</strong>{' '}
            <span style={{ textDecoration: 'underline' }}>{data.category}</span>
          </p>
          <p
            style={{
              border: '2px solid black',
              borderRadius: '10px',
              padding: '10px',
            }}
          >
            <strong style={{ color: 'green' }}>Desc:</strong> {data.description}
          </p>
        </>
      )}
    </div>
  );
}
export default StatusCard;

// CLEAN CODE
/* 
 {showDetails && (
        <>
          <p><strong>Category:</strong> {data.category}</p>
          <p><strong>Description:</strong> {data.description}</p>
        </>
      )}
*/
