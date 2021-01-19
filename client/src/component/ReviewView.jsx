import React from 'react';
import ReactDOM from 'react-dom';

const Review = (props) => {
  // console.log(props.review);
  return (
    <div>
      <h3>Review</h3>
      {props.review.date_create}
    </div>
  );
};

export default Review;