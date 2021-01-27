/* eslint-disable prefer-const */
const express = require('express');
const app = express();
const port = 3003;
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/index.js');
// const fakeData = require'../dummydatagenerator.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/products/:id', express.static(path.join(__dirname, '../client/dist')));
app.use(express.static(path.join(__dirname, '../client/dist')));

const getPerPage = (number, data) => {
  let currentPage = number;
  let postsPerPage = 5;
  let indexOfLastPost = currentPage * postsPerPage;
  let indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentReviews = data.slice(indexOfFirstPost, indexOfLastPost);
  currentReviews.unshift(data.length);
  return currentReviews;
};

// eslint-disable-next-line consistent-return
const getSort = (query) => {
  let sortByCategory = {
    'Most relevant': 'id',
    'Helpfulness': '1helpful_yes',
    'Rating - Low to High': 'overall_rate',
    'Rating - High to Low': '1overall_rate',
    'Date - oldest first': 'date_create',
    'Date - newest first': '1date_create'
  };
  for (let key in sortByCategory) {
    if (key === query) {
      return (sortByCategory[key]);
    }
  }
};

app.get('/api/products/:id', (req, res) => {
  let sortQuery = getSort(req.query.sort);
  // console.log(req.query);
  db.getReviewsData([req.params.id, sortQuery], (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      let selectPage = 1;
      if (req.query.page !== 'undefined') {
        selectPage = req.query.page;
      }
      let currentPage = getPerPage(selectPage, results);
      res.status(200).send(currentPage);
    }
  });
});

app.get('/api/products/overall/:id', (req, res) => {
  db.getOverallData(req.params.id, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      // console.log(results)
      res.status(200).send(results);
    }
  });
});

app.put('/api/reviews/:id', (req, res) => {
  // console.log(req.params.id)
  // console.log(req.body)
  const data = [req.body, req.params.id];
  db.updateData(data, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
