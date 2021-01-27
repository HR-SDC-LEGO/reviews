/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
import React from 'react';

const ratingStart = (value) => {
  switch (value) {
  case 0:
    return 'https://front-end-capstoneproject.s3-us-west-1.amazonaws.com/star-gray.png';
  case 50:
    return 'https://front-end-capstoneproject.s3-us-west-1.amazonaws.com/star-half.png';
  case 100:
    return 'https://front-end-capstoneproject.s3-us-west-1.amazonaws.com/star.png';
    // return './bar_ful.png';
  }
};

const ratingBrick = (value) => {
  switch (value) {
  case 0:
    return 'https://front-end-capstoneproject.s3-us-west-1.amazonaws.com/brick_gray.png';
  case 50:
    return 'https://front-end-capstoneproject.s3-us-west-1.amazonaws.com/brick_half.png';
  case 100:
    return 'https://front-end-capstoneproject.s3-us-west-1.amazonaws.com/brick_ful.png';
  }
};
const ratingIcons = (value) => {
  // console.log(value)
  switch (true) {
  case (!value):
    return [0, 0, 0, 0, 0];
  case (value > 0 && value < 1):
    return [50, 0, 0, 0, 0];
  case (value === 1):
    return [100, 0, 0, 0, 0];
  case (value > 1 && value < 2):
    return [100, 50, 0, 0, 0];
  case (value === 2):
    return [100, 100, 0, 0, 0];
  case (value > 2 && value < 3):
    return [100, 100, 50, 0, 0];
  case (value === 3):
    return [100, 100, 100, 0, 0];
  case (value > 3 && value < 4):
    return [100, 100, 100, 50, 0];
  case (value === 4):
    return [100, 100, 100, 100, 0];
  case (value > 4 && value < 5):
    return [100, 100, 100, 100, 50];
  case (value === 5):
    return [100, 100, 100, 100, 100];
  }
};

const Rating = ({ value }) => {
  if (typeof value === 'object') {
    return (
      <span className='star_rating'>
        {
          ratingIcons(parseFloat(value.star)).map((value, index) => <img src={ratingStart(value)} width={30} key={index} />)
        }
      </span>
    );
  }
  return (
    <span className='brick_rating'>
      {
        ratingIcons(parseFloat(value)).map((value, index) => <img src={ratingBrick(value)} width={30} key={index} />)
      }
    </span>
  );
};

export default Rating;