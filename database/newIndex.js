const { Pool } = require('pg');
const pool = new Pool({
  user: 'Jeremy',
  database: 'lego',
  password: '',
  port: 5432
});

const getReviews = (productId, stars, sort, callback) => {
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

  pool
    .query(reviewQuery)
    .then((res) => {
      callback(res.rows);
    })
    .catch((e) => callback(e));
};



module.exports = {
  getReviews
};
