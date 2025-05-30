import React, { useEffect, useState } from 'react';
import RealAPILoginForm from './components/RealAPILoginForm';
import RealAPIDashboard from './components/RealAPIDashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLogIn = localStorage.getItem('apilogin');
    if (storedLogIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('apilogin', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('apilogin');
  };

  return (
    <div>
      {isLoggedIn ? (
        <RealAPIDashboard onLogout={handleLogout} />
      ) : (
        <RealAPILoginForm onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}
export default App;
