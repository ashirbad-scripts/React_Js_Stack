import React, { useEffect, useState } from 'react';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [tag, setTag] = useState('');

  const fetchQuote = () => {
    fetch('https://api.freeapi.app/api/v1/public/quotes/quote/random')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setQuote(data.data.content);
          setAuthor(data.data.author);
          setTag(data.data.tags);
        }
      })
      .catch((err) => {
        alert('error fetching quote', err);
      });
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div>
      <h2>Random Quote generation</h2>
      <p>"{quote}"</p>
      <p>Tags : {tag.join(', ')}</p>
      <p> By - {author}</p>

      <button onClick={fetchQuote}>Get Another</button>
    </div>
  );
}
export default App;
