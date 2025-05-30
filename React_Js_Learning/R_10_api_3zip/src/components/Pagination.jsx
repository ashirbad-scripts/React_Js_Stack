import React from 'react';

function Pagination({ currentPage, setCurrentPage, totalPages }) {
  return (
    <div>
      <button
        onClick={() => setCurrentPage((current) => Math.max(current - 1, 1))}
      >
        Prev
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() =>
          setCurrentPage((current) => Math.min(current + 1, totalPages))
        }
      >
        Next
      </button>
    </div>
  );
}
export default Pagination;

// Simple format for understanding
/* 
import React from 'react';

function Pagination({currentPage, setCurrentPage, totalPages}){
  return(
    <div>
      <button onClick={() => setCurrentPage(current => Math.max(current - 1, 1))}>Prev</button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={() => setCurrentPage(current => Math.min(current + 1, 1))}>Next</button>
    </div>
  )
}
*/
