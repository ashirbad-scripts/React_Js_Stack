import React, { useState, useEffect } from 'react';

function UserStatus() {
  const [isOnline, setIsOnline] = useState(false); // Tracks online status

  // Simulate user coming online after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOnline(true); // After 2 seconds, user is online
    }, 2000);

    return () => clearTimeout(timer); // Cleanup
  }, []);

  return (
    <div
      style={{
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        width: '200px',
        textAlign: 'center',
        marginTop: '20px',
      }}
    >
      <h4>Status:</h4>
      <p style={{ color: isOnline ? 'green' : 'red' }}>
        {isOnline ? '🟢 Online' : '🔴 Offline'}
      </p>
    </div>
  );
}

export default UserStatus;
