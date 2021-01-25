import React from 'react';
import ReactDOM from 'react-dom';

const BarRating = (props) => {
  // console.log(props.bar)
  const barStyle = {
    height: 24,
    backgroundColor: 'rgb(255, 207, 0)',
    width: props.bar.ratePercentage
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '30px 0px',
      }}
    >
      <span className='rating-font-style' style={{ float: 'left', width: '20%' }}>
        {props.bar.id}
        <span> </span>
        stars
      </span>
      <div style={{ float: 'left', width: '50%' }}>
        <div
          style={{
            height: 24,
            backgroundColor: 'rgb(224, 224, 224)',
            borderRadius: 12,
            overflow: 'hidden',
            marginRight: 16
          }}
        >
          <div style={barStyle} />
        </div>
      </div>
      <span style={{ float: 'left', width: '30%' }}>
        {props.bar.rate}
        {' '}
        Reviews
      </span>
    </div>
  );
};

export default BarRating;