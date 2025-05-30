import React from 'react';
import UserProfile from './components/UserProfile';
import UserStatus from './components/UserStatus';

function App() {
  return (
    <div
      style={{
        padding: '40px',
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h2>👤 User Dashboard</h2>

      {/* Call both components here */}
      <UserProfile />
      <UserStatus />
    </div>
  );
}

export default App;
