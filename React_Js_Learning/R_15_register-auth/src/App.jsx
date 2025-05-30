import React, { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loggedInUSer, setLoggedInUSer] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('auth'));
    if (authData && authData.isLoggedIn) {
      setIsLoggedIn(true);
      setLoggedInUSer(authData.username);
    }
  }, []);

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (u) => u.username == loginUsername && u.password == loginPassword
    );
    if (user) {
      localStorage.setItem(
        'auth',
        JSON.stringify({ isLoggedIn: true, username: loginUsername })
      );
      setIsLoggedIn(true);
      setLoggedInUSer(loginUsername);
    } else {
      alert('Username not found, please register');
      setShowRegister(true);
    }
  };

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some((u) => u.username === registerUsername);
    if (userExists) {
      alert('USer already exists please log in');
      setShowRegister(false);
    } else {
      const newUsers = [
        ...users,
        { username: registerUsername, password: registerPassword },
      ];
      localStorage.setItem('users', JSON.stringify(newUsers));
      alert('Regsitration successful');
      setShowRegister(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setIsLoggedIn(false);
    setLoginUsername('');
    setLoginPassword('');
  };

  return (
    <div>
      <h1>Auth System</h1>
      {isLoggedIn ? (
        <div>
          <h2>Welcome, {loggedInUSer}</h2>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : showRegister ? (
        // show register form
        <div>
          <h2>Register</h2>
          <input
            type="text"
            value={registerUsername}
            onChange={(e) => setRegisterUsername(e.target.value)}
          />
          <input
            type="password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
          <button onClick={handleRegister}>Register</button>
          <p>
            Already have an account ?{''}
            <button onClick={() => setShowRegister(false)}>Login</button>
          </p>
        </div>
      ) : (
        // show login form
        <div>
          <h2>Login</h2>
          <input
            type="text"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
          />
          <input
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          <p>
            Don’t have an account?{' '}
            <button onClick={() => setShowRegister(true)}>Register</button>
          </p>
        </div>
      )}
    </div>
  );
}
export default App;
