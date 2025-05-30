import React, { useState, useEffect } from 'react';

function BatteryStatus() {
  const [battery, setBattery] = useState(0); // Battery percentage
  const [charging, setCharging] = useState(false); // Charging status

  useEffect(() => {
    let intervalId;

    if (charging && battery < 100) {
      // If charging is true and battery isn't full, increase battery
      intervalId = setInterval(() => {
        setBattery((prev) => {
          if (prev >= 100) {
            clearInterval(intervalId); // Stop when 100%
            return 100;
          }
          return prev + 10; // Charge by 10% every second
        });
      }, 1000);
    }

    // Clean up when component unmounts or charging toggles
    return () => {
      clearInterval(intervalId);
    };
  }, [charging, battery]); // Re-run if charging or battery changes

  const handleToggleCharging = () => {
    if (battery >= 100) return; // Don’t start charging if full
    setCharging((prev) => !prev); // Toggle charging state
  };

  const reset = () => {
    setBattery(0);
    setCharging(false);
  };

  return (
    <div
      style={{
        font: 'Comic-sans',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
      }}
    >
      <h3>🔋 Battery Status</h3>
      <div
        style={{
          height: '30px',
          width: '100%',
          background: '#eee',
          borderRadius: '5px',
          overflow: 'hidden',
          marginBottom: '10px',
        }}
      >
        {/* Green bar to show battery charge */}
        <div
          style={{
            height: '100%',
            width: `${battery}%`,
            background: 'limegreen',
            transition: 'width 0.5s',
          }}
        ></div>
      </div>
      <p>{battery}% Charged</p>

      <button
        onClick={handleToggleCharging}
        style={{ padding: '10px 15px', fontSize: '16px' }}
      >
        {charging ? 'Stop Charging' : 'Start Charging'}
      </button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default BatteryStatus;
