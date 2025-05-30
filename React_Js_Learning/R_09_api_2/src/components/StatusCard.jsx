import React from 'react';

function StatusCard({ data }) {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '10px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h3>
        ✅ {data.statusCode} - {data.statusMessage}
      </h3>
      <p>
        <strong>Category:</strong> {data.category}
      </p>
      <p>
        <strong>Description:</strong> {data.description}
      </p>
    </div>
  );
}

export default StatusCard;
