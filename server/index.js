/* eslint-disable prefer-const */
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/index.js');
// const fakeData = require'../dummydatagenerator.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

// const getFormattedDate = (data) => {
//   let product_id = data[0].product_id;
//   let rate1 = 0;
//   let rate2 = 0;
//   let rate3 = 0;
//   let rate4 = 0;
//   let rate5 = 0;
//   let difficulty1 = 0;
//   let difficulty2 = 0;
//   let difficulty3 = 0;
//   let difficulty4 = 0;
//   let difficulty5 = 0;
//   let experience1 = 0;
//   let experience2 = 0;
//   let experience3 = 0;
//   let experience4 = 0;
//   let experience5 = 0;
//   let value1 = 0;
//   let value2 = 0;
//   let value3 = 0;
//   let value4 = 0;
//   let value5 = 0;
//   let recommend = 0;

//   for (const i of data) {
//     switch (i.overall_rate) {
//     case 5: rate5++;
//       break;
//     case 4: rate4++;
//       break;
//     case 3: rate3++;
//       break;
//     case 2: rate2++;
//       break;
//     case 1: rate1++;
//       break;
//     }
//     switch (i.level_difficulty) {
//     case 5: difficulty5++;
//       break;
//     case 4: difficulty4++;
//       break;
//     case 3: difficulty3++;
//       break;
//     case 2: difficulty2++;
//       break;
//     case 1: difficulty1++;
//       break;
//     }
//     switch (i.value_for_money) {
//     case 5: value5++;
//       break;
//     case 4: value4++;
//       break;
//     case 3: value3++;
//       break;
//     case 2: value2++;
//       break;
//     case 1: value1++;
//       break;
//     }
//     switch (i.play_experience) {
//     case 5: experience5++;
//       break;
//     case 4: experience4++;
//       break;
//     case 3: experience3++;
//       break;
//     case 2: experience2++;
//       break;
//     case 1: experience1++;
//       break;
//     }
//     switch (i.recommend) {
//     case 1: recommend++;
//       break;
//     }
//   }

//   let rating = ((5 * rate5 + 4 * rate4 + 3 * rate3 + 2 * rate2 + 1 * rate1) / data.length).toFixed(1);
//   let difficulty = ((5 * difficulty5 + 4 * difficulty4 + 3 * difficulty3 + 2 * difficulty2 + 1 * difficulty1) / data.length).toFixed(1);
//   let experience = ((5 * experience5 + 4 * experience4 + 3 * experience3 + 2 * experience2 + 1 * experience1) / data.length).toFixed(1);
//   let value = ((5 * value5 + 4 * value4 + 3 * value3 + 2 * value2 + 1 * value1) / data.length).toFixed(1);
//   // eslint-disable-next-line prefer-template
//   let recommendToOther = Math.floor((recommend / data.length) * 100) + '%';
//   let ratePercentage1 = Math.floor((rate1 / data.length) * 100) + '%';
//   let ratePercentage2= Math.floor((rate2/ data.length) * 100) + '%';
//   let ratePercentage3 = Math.floor((rate3 / data.length) * 100) + '%';
//   let ratePercentage4 = Math.floor((rate4 / data.length) * 100) + '%';
//   let ratePercentage5 = Math.floor((rate5 / data.length) * 100) + '%';

//   return {
//     'rating': rating,
//     'difficulty': difficulty,
//     'experience': experience,
//     'value_money': value,
//     'rate1': rate1,
//     'rate2': rate2,
//     'rate3': rate3,
//     'rate4': rate4,
//     'rate5': rate5,
//     'ratePercentage1': ratePercentage1,
//     'ratePercentage2': ratePercentage2,
//     'ratePercentage3': ratePercentage3,
//     'ratePercentage4': ratePercentage4,
//     'ratePercentage5': ratePercentage5,
//     'recommendToOther': recommendToOther,
//     'number_review': data.length,
//     'product_id': product_id
//   };
// };

// app.post('/fakedata', (req, res) => {
//   const allData = [
//     fakeData.generateUsers(),
//     fakeData.generateProducts(),
//     fakeData.generateReviews()
//   ];
//   db.insertData(allData, (err, results) => {
//     if (err) {
//       res.status(400).send(err);
//     } else {
//       // console.log(result
//       res.end();
//     }
//   });
// });