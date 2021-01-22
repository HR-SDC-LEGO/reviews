import React from 'react';
import ReactDOM from 'react-dom';
import Rating from './Rating.jsx';

function ConvertMinutes(num) {
  const d = Math.floor(num / 1440);
  const h = Math.floor((num - (d * 1440)) / 60);
  const m = Math.round(num % 60);

  if (d > 0) {
    return `${d} days, ${h} hours, ${m} minutes`;
  }
  return `${h} hours, ${m} minutes`;
}

const Review = (props) => {
  // console.log(props.review);
  const { date_create, age, build_time, building_experience, content, helpful_no, helpful_yes, image1, image2, image3, lego_reply, level_difficulty, overall_rate, play_experience, purchase_for, recommend, title, username, value_for_money } = props.review;
  const starRating = { 'star': overall_rate };
  const newRating = overall_rate.toFixed(1);
  const ageDisplay = ['14-18', '19-24', '25-34', '35-44', '45-54', '55-64', '65 Or Older'];
  const recommendToFriend = ['', 'I would recommend this to a friend!'];
  const buildTime = ConvertMinutes(build_time);
  const buildExperience = ['Novice LEGO Builder', 'Intermediate LEGO Builder', 'Advanced LEGO Builder', 'Expert LEGO Builder'];
  // console.log(buildExperience[building_experience]);

  return (
    <div>
      <div className='date'>{date_create}</div>
      <div className='star'>
        <Rating value={starRating} />
        {newRating}
      </div>
      <h3 className='title'>{title}</h3>
      <div className='user'>
        {username}
        <span> | </span>
        {ageDisplay[age - 1]}
      </div>
      <p className='recommend'>
        {recommendToFriend[recommend]}
      </p>
      <div>
        Purchased For:
        <span>{purchase_for}</span>
      </div>
      <p className='content'>
        {content}
      </p>
      {/* <div class='img'>
        <img src={image1} alt="user's image"/>
        <img src={image2} alt="user's image"/>
        <img src={image3} alt="user's image"/>
      </div> */}
      <div className='helpful'>
        Was this helpful?
      </div>
      <div className='brickRating'>
        <p>Play Experience</p>
        <Rating value={play_experience} />
        <span>{play_experience}</span>
        <p>Level of Difficulty</p>
        <Rating value={level_difficulty} />
        <span>{level_difficulty}</span>
        <p>Value for Money</p>
        <Rating value={value_for_money} />
        <span>{value_for_money}</span>
      </div>
      <p>
        Build Time:
        {buildTime}
      </p>
      <p className='experience'>
        <span>Building Experience:</span>
        {buildExperience[building_experience]}
      </p>
    </div>
  );
};

export default Review;