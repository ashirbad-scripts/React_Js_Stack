import React from 'react';

function UserProfile() {
  return (
    <div
      style={{
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        width: '200px',
        textAlign: 'center',
      }}
    >
      {/* Static profile picture */}
      <img
        src="https://i.pravatar.cc/150?img=3"
        alt="User Avatar"
        style={{ borderRadius: '50%', width: '100px', height: '100px' }}
      />

      {/* Display username */}
      <h3>Captain Willow</h3>
    </div>
  );
}

export default UserProfile;
