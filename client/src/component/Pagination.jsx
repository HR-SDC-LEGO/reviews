/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

const Pagination = ({ reviewPerPage, totalReviews, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalReviews / reviewPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='page-bar'>
      <ul className='pagination'>
        {pageNumbers.map((number) => (
          <li key={number} className='page-item'>
            <div onClick={() => paginate(number)}>
              {number}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;