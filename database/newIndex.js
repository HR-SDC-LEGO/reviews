const { Pool } = require('pg');
const pool = new Pool({
  user: 'Jeremy',
  database: 'lego',
  password: '',
  port: 5432
});

const getReviews = async (productId, stars, sort) => {
  // page defaults to sort by 'most relevant' (using building_experience)
  let sortBy = 'building_experience';
  let sortStars;
  let ascOrDesc = 'DESC';
  if (sort === 'date-newest') {
    sortBy = 'review_date';
  }
  if (sort === 'date-oldest') {
    sortBy = 'review_date';
    ascOrDesc = 'ASC';
  }
  if (sort === 'rating-high') {
    sortBy = 'rating';
  }
  if (sort === 'rating-low') {
    sortBy = 'rating';
    ascOrDesc = 'ASC';
  }
  if (sort === 'helpfulness') {
    sortBy = 'rating';
  }

  if (stars) {
    sortStars = stars.split('');
  } else {
    sortStars = [5, 4, 3, 2, 1];
  }
  const reviewQuery = {
    text: `
      SELECT * FROM reviews
      WHERE product_id = $1
      AND rating = ANY ($2)
      ORDER BY ${sortBy} ${ascOrDesc}
      `,
    values: [productId, sortStars]
  };

  const reviewsDataQuery = {
    text: `
      SELECT AVG(rating) AS avgRating,
      AVG(play_experience) AS avgPlayExp,
      AVG(level_of_difficulty) AS avgDiff,
      AVG(value_for_money) AS avgVal
      FROM reviews
      WHERE product_id = $1
    `,
    values: [productId]
  };

  const starsDataQuery = {
    text: `
      SELECT rating, count(rating) FROM reviews
      WHERE product_id = $1
      GROUP BY rating
    `,
    values: [productId]
  };

  const allReviews = await pool.query(reviewQuery);
  const reviewsAvgs = await pool.query(reviewsDataQuery);
  const starsTotals = await pool.query(starsDataQuery);

  return [allReviews.rows, reviewsAvgs.rows, starsTotals.rows];
};

module.exports = {
  getReviews
};
