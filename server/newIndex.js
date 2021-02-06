const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { getReviews } = require('../database/newIndex');

const app = express();
const port = 3003;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/api/products/:id/reviews', (req, res) => {
  // query function to get all reviews for one product
  // on page load, sort defaults to 'Most relevant'
  const { sort, stars } = req.query;
  const { id } = req.params;
  getReviews(id, stars, sort)
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

app.patch('/api/reviews/:reviewid', (req, res) => {
  // query function to update review (upvotes/downvotes)
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});