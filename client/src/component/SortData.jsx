import React from 'react';

const SortData = ({ sortData }) => {
  // console.log(sortData);
  // const options = [
  //   { value: 'Most relevant', label: 'Most relevant' },
  //   { value: 'Helpfulness', label: 'Helpfulness' },
  //   { value: 'Rating - Low to High', label: 'Rating - Low to High' },
  //   { value: 'Rating - High to Low', label: 'Rating - High to Low' },
  //   { value: 'Date - oldest first', label: 'Date - oldest first' },
  //   { value: 'Date - newest first', label: 'Date - newest first' }
  // ];
  return (
    <div className='sort'>
      <h3>Reviews</h3>
      <form>
        <select onChange={(e) => {
          const selectOpt = e.target.value;
          sortData(e.target.value);
        }}
        >
          <option value='Most relevant' defaultValue>Most relevant</option>
          <option value='Helpfulness'>Helpfulness</option>
          <option value='Rating - Low to High'>Rating - Low to High</option>
          <option value='Rating - High to Low'>Rating - High to Low</option>
          <option value='Date - oldest first'>Date - oldest first</option>
          <option value='Date - newest first'>Date - newest first</option>
        </select>
      </form>
    </div>
  );
};

export default SortData;