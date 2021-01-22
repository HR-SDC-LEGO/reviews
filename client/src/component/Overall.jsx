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
      <div>
        <div>
          Customer Reviews
          (
          {number_review}
          )
        </div>
        <div className='rating'>
          <Rating value={starRating} />
          <span>
            {rating}
            (
            {this.props.reviewsCount}
            Reviews
            )
          </span>
        </div>
        <div className='recommend'>
          {recommendToOther}
          would recommend this product.
        </div>
        <p>Rating</p>
        <div>
          {barData.map((bar) => (
            <BarRating bar={bar} key={bar.id} />
          ))}
        </div>
        <div>
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
        <div>
          <button type='button' onClick={this.handleSubmit()}>
            Write a Review
          </button>
        </div>
      </div>
    );
  }
}

export default Overall;