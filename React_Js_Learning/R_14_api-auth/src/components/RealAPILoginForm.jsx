import React, { useState } from 'react';

function RealAPILoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(
        'https://6809a31e1f1a52874cdd4a2c.mockapi.io/users'
      );
      const users = await res.json();

      const matchUser = users.find(
        (u) => u.name == username && u.password == password
      );

      if (matchUser) {
        onLoginSuccess();
      } else {
        setError('USer not Found');
      }
    } catch (err) {
      console.error('APi error', err);
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Real API LogIn</h2>

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {loading && <p>Logging in...</p>}
      {error && <p>{error}</p>}

      <button type="submit" disabled={loading}>
        Log in
      </button>
    </form>
  );
}
export default RealAPILoginForm;
