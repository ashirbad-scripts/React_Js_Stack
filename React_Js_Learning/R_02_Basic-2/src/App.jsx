import React, { useState } from 'react';
import ColorDisplay from './components/ColorDisplay';
import ColorInput from './components/ColorInput';
import ColorButton from './components/ColorButton';

function App() {
  const [inputColor, setInputColor] = useState('');
  const [appliedColor, setAppliedColor] = useState('lightgray');

  const handleApplyColor = () => {
    setAppliedColor(inputColor);
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Color Picker</h1>
      <ColorDisplay color={appliedColor} />
      <ColorInput
        value={inputColor}
        onChange={(e) => setInputColor(e.target.value)}
      />
      <ColorButton onClick={handleApplyColor} />
    </div>
  );
}
export default App;
