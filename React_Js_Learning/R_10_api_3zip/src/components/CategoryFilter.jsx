import React from 'react';

function CategoryFilter({ selected, setSelected }) {
  return (
    <select value={selected} onChange={(e) => setSelected(e.target.value)}>
      <option value="All">All categories</option>
      <option value="Informational">Informational</option>
      <option value="Success">Success</option>
      <option value="Redirection">Redirection</option>
      <option value="Client Error">Client Error</option>
      <option value="Server Error">Server Error</option>
    </select>
  );
}

export default CategoryFilter;
