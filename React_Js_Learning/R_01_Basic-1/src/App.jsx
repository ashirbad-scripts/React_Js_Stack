import React, { useState } from 'react';

// 1️⃣ Import the components
import Greeting from './components/Greeting';
import Input from './components/Input';
import Button from './components/Button';

function App() {
  const [name, setName] = useState('');

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>🧱 Component Island</h1>

      {/* 2️⃣ Use the Greeting component */}
      <Greeting name={name} />

      {/* 3️⃣ Use the Input component */}
      <Input value={name} onChange={(e) => setName(e.target.value)} />

      <br />

      {/* 4️⃣ Use the Button component */}
      <Button onClick={() => setName('')} />
    </div>
  );
}

export default App;
