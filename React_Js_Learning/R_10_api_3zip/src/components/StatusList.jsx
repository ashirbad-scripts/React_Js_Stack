import React from 'react';
import StatusCard from './StatusCard';

function StatusList({ items }) {
  return (
    <div style={{ fontFamily: 'consolas' }}>
      {items.map((code) => (
        <StatusCard key={code.statusCode} data={code} />
      ))}
    </div>
  );
}
export default StatusList;
