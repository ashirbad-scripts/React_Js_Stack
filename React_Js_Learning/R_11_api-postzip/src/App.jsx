import { useState } from 'react';
import './index.css';

function App() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        body: body,
        userId: 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(data);
        setTitle('');
        setBody('');
      })
      .catch((err) => alert('failed to fetch', err));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Create a Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: '15px', padding: '10px' }}
        />
        <textarea
          placeholder="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={{ marginBottom: '15px', padding: '10px' }}
        />
        <button type="submit">Submit</button>
      </form>

      {response && (
        <div>
          <h3>Response: - </h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
          <button onClick={() => setResponse(null)}>Clear</button>
        </div>
      )}
    </div>
  );
}

export default App;
