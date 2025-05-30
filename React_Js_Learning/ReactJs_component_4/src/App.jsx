import React from 'react';
import StartTimer from './components/StartTimer';

function App() {
  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>
      <h2>🧠 Component-Based Timer</h2>

      {/* Import and render StartTimer component */}
      <StartTimer />
    </div>
  );
}

export default App;
