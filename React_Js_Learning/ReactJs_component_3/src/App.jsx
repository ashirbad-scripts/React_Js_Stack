import React, { useState } from 'react';
import MoodButton from './components/MoodButton';

function App() {
  const [selectedMood, setSelectedMood] = useState('');
  const moodEmojis = {
    Happy: '😄',
    Sad: '😢',
    Angry: '😠',
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  return (
    <div>
      <MoodButton mood="Happy" onSelect={handleMoodSelect} />
      <MoodButton mood="Sad" onSelect={handleMoodSelect} />
      <MoodButton mood="Angry" onSelect={handleMoodSelect} />

      {selectedMood && (
        <div style={{ marginTop: '20px', fontSize: '60px' }}>
          {moodEmojis[selectedMood]}
        </div>
      )}
    </div>
  );
}

export default App;
