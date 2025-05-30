import React, { useEffect, useState } from 'react';
import StatusCard from './components/StatusCard.jsx';

function App() {
  const [sc, setSc] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.freeapi.app/api/v1/kitchen-sink/status-codes')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSc(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        alert('Error fetching', err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Status Code Explore</h2>
      {loading ? (
        <p>Loading codes....</p>
      ) : (
        Object.keys(sc).map((e) => <StatusCard key={e} data={sc[e]} />)
      )}
    </div>
  );
}
export default App;
