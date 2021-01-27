import React from 'react';

const TopBar = ({ totalReviews, hiddenContent }) => {
  return (
    <button type='button' className='animation-btn' onClick={() => { hiddenContent(); }}>
      <div className='sharedstyle'>
        <div className='grey-bar'>
          <h2>
            Customer Reviews
            <span>
              (
              {totalReviews}
              )
            </span>
          </h2>
          {/* <div className='spin-icon'></div> */}
        </div>
      </div>
    </button>
  );
};

export default TopBar;