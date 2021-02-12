require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { getReviews, voteHelpful } = require('../database/newIndex');

const app = express();
const port = 3003;

app.use(bodyParser.json());
app.use('/products/:id', express.static(`${__dirname}/../client/dist`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/loaderio-c2825bb5d464eb4c46922cdcfa19e419', (req, res) => {
  res.statusCode = 200;
  res.download('./server/loaderio-c2825bb5d464eb4c46922cdcfa19e419.txt');
});

// Get all reviews for one product
app.get('/api/products/:id/reviews', (req, res) => {
  // console.time('getReq');
  const { sort, stars, page } = req.query;
  const { id } = req.params;
  getReviews(id, stars, sort, page)
    .then((results) => {
      // console.timeEnd('getReq');
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

// Update upvotes/downvotes for one review
app.patch('/api/products/:id/reviews/:reviewId', (req, res) => {
  console.time('patchReq');
  const { id, reviewId } = req.params;
  const { vote } = req.body;
  voteHelpful(id, reviewId, vote)
    .then((results) => {
      console.timeEnd('patchReq');
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});