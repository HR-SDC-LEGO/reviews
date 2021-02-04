const { Pool } = require('pg');
const pool = new Pool({
  user: 'Jeremy',
  database: 'lego',
  password: '',
  port: 5432
});

const getReviews = (productId, stars, sort, callback) => {
  let sortBy;
  let sortStars;
  if (sort === 'Date - newest first') {
    sortBy = 'review_date';
  }
  if (stars) {
    sortStars = stars.split(' ').map((star) => Number(star));
    console.log(sortStars);
  } else {
    sortStars = [5, 4, 3, 2, 1];
  }
  const reviewQuery = {
    text: `
      SELECT * FROM reviews
      WHERE product_id = $1
      AND rating IN (${sortStars.join(',')})
      ORDER BY $2
      `,
    values: [productId, sortBy]
  };

  pool
    .query(reviewQuery)
    .then((res) => callback(res))
    .catch((e) => callback(e));
};

module.exports = {
  getReviews
};
