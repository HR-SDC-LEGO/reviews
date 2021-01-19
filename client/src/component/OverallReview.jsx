import React from 'react';
import ReactDOM from 'react-dom';
import Review from './ReviewView.jsx';

const OverallReview = (props) => {
  // console.log(props);
  return (
    <div>
      {props.reviews.map((review) => (
        <Review review = {review} key = {review.id} />
      ))}
    </div>
  );
};

export default OverallReview;



