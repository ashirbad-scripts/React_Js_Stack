import React, { useEffect, useState } from 'react';
import './index.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => alert('Fetching error', err));
  }, []);

  const handleDelete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const remaining = posts.filter((p) => p.id !== id);
        setPosts(remaining);
      })
      .catch((err) => alert('there has beeen an error while deleteing', err));
  };

  const startEdit = (p) => {
    setEditPost(p);
    setUpdatedTitle(p.title);
  };

  const saveEdit = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${editPost.id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        ...editPost,
        title: updatedTitle,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedPosts = posts.map((p) =>
          p.id === editPost.id ? data : p
        );

        setPosts(updatedPosts);
        setEditPost(null);
      })
      .catch((err) => console.error('Error Updating', err));
  };

  return (
    <div>
      <h1>PUT and DELETE</h1>
      {posts.map((p) => (
        <div key={p.id}>
          {editPost && editPost.id === p.id ? (
            <>
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <button onClick={saveEdit}>💾 Save</button>
              <button onClick={() => setEditPost(null)}>❌ Cancel</button>
            </>
          ) : (
            <>
              <h3>{p.title}</h3>
              <button onClick={() => startEdit(p)}>✏️ Edit</button>
              <button onClick={() => handleDelete(p.id)}>🗑️ Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
export default App;
