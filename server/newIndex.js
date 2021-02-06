const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { getReviews } = require('../database/newIndex');

const app = express();
const port = 3003;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist')));

// Get all reviews for one product
app.get('/api/products/:id/reviews', (req, res) => {
  console.time('getReq');
  const { sort, stars } = req.query;
  const { id } = req.params;
  getReviews(id, stars, sort)
    .then((results) => {
      console.timeEnd('getReq');
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

// Update upvotes/downvotes for one review
app.patch('/api/reviews/:reviewid', (req, res) => {
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});