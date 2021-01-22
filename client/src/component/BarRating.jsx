import React from 'react';
import ReactDOM from 'react-dom';

const BarRating = (props) => {
  // console.log(props.bar)
  const barStyle = {
    height: 24,
    backgroundColor: 'yellow',
    width: props.bar.ratePercentage
  }

  return (
    <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '16px 0px',
        }}
      >
        <span style={{ float: 'left', width: '10%' }}>{props.bar.id} stars</span>
        <div style={{ float: 'left', width: '80%' }}>
          <div
            style={{
              height: 24,
              backgroundColor: 'grey',
              borderRadius: 12,
              overflow: 'hidden',
              marginRight: 16,
            }}
          >
            <div style={barStyle} />
          </div>
        </div>
        <span style={{ float: 'left', width: '10%' }}>{props.bar.rate} Reviews</span>
      </div>
  )
}

export default BarRating;