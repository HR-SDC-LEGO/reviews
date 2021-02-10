const { Pool } = require('pg');
const pool = new Pool({
  user: 'Jeremy',
  database: 'lego',
  password: '',
  port: 5432
});

const getReviews = async (productId, stars, sort, page = 1) => {
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
    sortBy = 'helpful';
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
      LIMIT 4
      OFFSET ${4 * (page - 1)}
      `,
    values: [productId, sortStars]
  };

  const reviewsDataQuery = {
    text: `
      SELECT AVG(rating) AS avgRating,
      AVG(play_experience) AS avgPlayExp,
      AVG(level_of_difficulty) AS avgDiff,
      AVG(value_for_money) AS avgVal,
      COUNT(*) AS totalReviews,
      COUNT(rating) filter (where rating = 5) AS ratings5,
      COUNT(rating) filter (where rating = 4) AS ratings4,
      COUNT(rating) filter (where rating = 3) AS ratings3,
      COUNT(rating) filter (where rating = 2) AS ratings2,
      COUNT(rating) filter (where rating = 1) AS ratings1
      FROM reviews
      WHERE product_id = $1
    `,
    values: [productId]
  };

  const allReviews = await pool.query(reviewQuery);
  const reviewsAvgs = await pool.query(reviewsDataQuery);

  return [allReviews.rows, reviewsAvgs.rows];
};

const voteHelpful = async (id, reviewId, vote) => {
  const query = {
    text: `
      UPDATE reviews
      SET ${vote} = ${vote} + 1
      WHERE product_id = $1
      AND review_id = $2
    `,
    values: [id, reviewId]
  };
  const results = await pool.query(query);
  return results;
};

module.exports = {
  getReviews,
  voteHelpful
};
