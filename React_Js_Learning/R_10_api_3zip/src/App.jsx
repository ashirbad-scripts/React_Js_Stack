import React, { useEffect, useState } from 'react';
import CategoryFilter from './components/CategoryFilter';
import SortButtons from './components/SortButtons';
import StatusList from './components/StatusList';
import Pagination from './components/Pagination';

function App() {
  const [allData, setAllData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [category, setCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  useEffect(() => {
    fetch('https://api.freeapi.app/api/v1/kitchen-sink/status-codes')
      .then((res) => res.json())
      .then((json) => {
        const codes = Object.values(json.data);
        setAllData(codes);
      });
  }, []);

  useEffect(() => {
    let data = [...allData];
    if (category !== 'All') {
      data = data.filter((item) => item.category === category);
    }

    if (sortOrder == 'asc') {
      data.sort((a, b) => a.statusCode - b.statusCode);
    } else {
      data.sort((a, b) => b.statusCode - a.statusCode);
    }

    setFiltered(data);
    setCurrentPage(1);
  }, [allData, category, sortOrder]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedItems = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <h1>Status Code</h1>
      <CategoryFilter selected={category} setSelected={setCategory} />
      <SortButtons sortOrder={sortOrder} setSortOrder={setSortOrder} />
      <StatusList items={paginatedItems} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
export default App;
