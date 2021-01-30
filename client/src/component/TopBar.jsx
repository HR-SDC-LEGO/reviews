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
          <div className='IconPlusMinus__PlusMinusIcon-bckkl2-0 iwGswK ProductAccordionstyles__ExpandIcon-f6m1h5-2 dHWNWl'>➕</div>
        </div>
      </div>
    </button>
  );
};

export default TopBar;