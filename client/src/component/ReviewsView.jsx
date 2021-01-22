import React from 'react';
import ReactDOM from 'react-dom';
import Review from './ReviewView.jsx';
import Overall from './Overall.jsx';

const Reviews = (props) => {
  // console.log(props);
  return (
    <div id='review'>
      {props.reviews.map((review) => (
        <Review review={review} key={review.id} />
      ))}
    </div>
  );
};

export default Reviews;