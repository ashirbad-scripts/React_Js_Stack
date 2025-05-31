import React, { useState, useEffect } from 'react';

function StartTimer() {
  const [seconds, setSeconds] = useState(0); // Store current time in seconds
  const [isRunning, setIsRunning] = useState(false); // Track if timer is running

  // useEffect to run the timer
  useEffect(() => {
    let intervalId;

    if (isRunning) {
      // If timer is running, start a new interval
      intervalId = setInterval(() => {
        setSeconds((prev) => prev + 1); // Increase time every second
      }, 1000);
    }

    // Cleanup function to stop the interval when component unmounts or when isRunning changes
    return () => {
      clearInterval(intervalId); // Clear timer to avoid multiple intervals
    };
  }, [isRunning]); // Re-run effect whenever isRunning changes

  // Toggle the timer on button click
  const handleToggle = () => {
    setIsRunning((prev) => !prev); // Flip the state
  };

  const reset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <div
      style={{
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
      }}
    >
      <h3>⏱️ Timer: {seconds} seconds</h3>

      {/* Toggle button to start/stop the timer */}
      <button
        onClick={handleToggle}
        style={{
          padding: '10px 15px',
          fontSize: '16px',
          borderRadius: '50px',
          border: '3px solid green',
        }}
      >
        {isRunning ? 'Stop' : 'Start'} Timer
      </button>

      <button
        onClick={reset}
        style={{
          padding: '10px 15px',
          fontSize: '16px',
          marginLeft: '20px',
          borderRadius: '50px',
          border: '3px solid red',
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default StartTimer;
