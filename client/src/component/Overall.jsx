import React from 'react';
import ReactDOM from 'react-dom';
import Rating from './Rating.jsx';
import BarRating from './BarRating.jsx';

class Overall extends React.Component {
  // constructor(props) {
  //   super(props);
  // this.state = {
  //   writeReview: ''
  // };
  // }

  // eslint-disable-next-line class-methods-use-this
  handleSubmit() {
    // console.log('write review page')
  }

  render() {
    // console.log(this.props.overall)
    const { difficulty, experience, rate1, rate2, rate3, rate4, rate5, rating, recommendToOther, number_review, value_money, ratePercentage1, ratePercentage2, ratePercentage3, ratePercentage4, ratePercentage5 } = this.props.overall;

    const barData = [
      { 'id': 5, 'ratePercentage': ratePercentage5, 'rate': rate5 },
      { 'id': 4, 'ratePercentage': ratePercentage4, 'rate': rate4 },
      { 'id': 3, 'ratePercentage': ratePercentage3, 'rate': rate3 },
      { 'id': 2, 'ratePercentage': ratePercentage2, 'rate': rate2 },
      { 'id': 1, 'ratePercentage': ratePercentage1, 'rate': rate1 }
    ];
    const starRating = { 'star': rating };

    return (
      <div className='overview'>
        <div className='rating_wrapper'>
          <div className='rating'>
            <div className='overallRating'>
              Overall Rating
              <div>
                <Rating value={starRating} />
                <span className='count-reviews'>
                  {rating}
                  (
                  {this.props.reviewsCount}
                  Reviews
                  )
                </span>
              </div>
            </div>
            <button className='review-btn' type='button' onClick={this.handleSubmit()}>
              Write a Review
            </button>
          </div>
          <div className='recommend'>
            {recommendToOther}
            would recommend this product.
          </div>
          <div className='rating-box'>
            <div className='left-part'>
              <p>Rating</p>
              <div className='rating-part'>
                {barData.map((bar) => (
                  <BarRating bar={bar} key={bar.id} />
                ))}
              </div>
            </div>
            <div className='overall-experience'>
              <p>Overall Experience</p>
              <div>
                <p>Play Experience</p>
                <Rating value={experience} />
                <span>{experience}</span>
                <p>Level of Difficulty</p>
                <Rating value={difficulty} />
                <span>{difficulty}</span>
                <p>Value for Money</p>
                <Rating value={value_money} />
                <span>{value_money}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Overall;