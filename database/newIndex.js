const { Pool } = require('pg');
const pool = new Pool({
  user: 'Jeremy',
  database: 'lego',
  password: '',
  port: 5432
});

const getReviews = (productId, stars, sort, callback) => {
  // page defaults to sort by 'most relevant'
  // using building_experience to sort by 'most relevant'
  let sortBy = 'building_experience ASC';
  let sortStars;
  let ascOrDesc = 'ASC';
  if (sort === 'date-newest') {
    sortBy = 'review_date';
    ascOrDesc = 'DESC';
  }
  if (sort === 'date-oldest') {
    sortBy = 'review_date';
  }
  if (sort === 'rating-high') {
    sortBy = 'rating';
    ascOrDesc = 'DESC';
  }
  if (sort === 'rating-low') {
    sortBy = 'rating';
  }
  if (sort === 'helpfulness') {
    sortBy = 'rating';
    ascOrDesc = 'DESC';
  }
  console.log(sortBy)
  // input 'stars' are string of nums
  if (stars) {
    sortStars = stars.split(' ');
  } else {
    sortStars = [5, 4, 3, 2, 1];
  }
  const reviewQuery = {
    text: `
      SELECT * FROM reviews
      WHERE product_id = $1
      AND rating IN (${sortStars.join(',')})
      ORDER BY $2 ASC;
      `,
    values: [productId, sortBy]
  };
  console.log(reviewQuery);

  pool
    .query(reviewQuery)
    .then((res) => callback(res))
    .catch((e) => callback(e));
};

module.exports = {
  getReviews
};
