import React from 'react';

function SortButtons({ setOrder, setSortOrder }) {
  return (
    <div>
      <button onClick={() => setSortOrder('asc')}>Sort Asc</button>
      <button onClick={() => setSortOrder('desc')}>Sort Desc</button>
    </div>
  );
}

export default SortButtons;
