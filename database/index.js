/* eslint-disable prefer-template */
const mysql = require('mysql');
const key = require('./config/key.js');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: key,
  database: 'reviews'
});

connection.connect();

const getReviewsData = (reqData, callback) => {
  // console.log(reqData);
  const product_id = reqData[0];
  const sorter = reqData[1];
  let sql = 'SELECT * FROM reviewList WHERE product_id = ? ';
  if (sorter === '1date_create' || sorter === '1overall_rate' || sorter === '1helpful_yes') {
    sql = 'SELECT * FROM reviewList WHERE product_id = ? ORDER BY ' + connection.escapeId(sorter.slice(1)) + 'DESC';
  } else if (sorter !== undefined) {
    sql = 'SELECT * FROM reviewList WHERE product_id = ? ORDER BY ' + connection.escapeId(sorter);
  }

  connection.query(sql, product_id, (err, data) => {
    if (err) {
      callback(err);
    } else {
      // console.log(data)
      callback(null, data);
    }
  });
};

const getOverallData = (product_id, callback) => {
  connection.query('SELECT * FROM overall WHERE product_id = ?', product_id, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

const updateData = (data, callback) => {
  const userId = Number(data[0].id);
  const updateCol = data[0].option;
  const passData = [data[0].likeOrDislike, userId];

  // console.log(updateCol)
  // console.log(updateData)
  connection.query(`UPDATE reviewList SET ${updateCol} = ? WHERE id = ?`, passData, (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};

// const insertData = (fakeData, callback) => {
//   for (let data of fakeData) {
//     const key = Object.keys(data)[0];
//     const arrData = data[key];
//     for (let eachData of arrData) {
//       connection.query(`INSERT INTO ${key} SET ?`, eachData, (err, results) => {
//         if (err) {
//           callback(err);
//         } else {
//           callback(null, results);
//         }
//       });
//     }
//   }
// };

// const insertOverall = (fakeData, callback) => {
//   console.log(fakeData)
//   connection.query('INSERT INTO overall SET ?', fakeData, (err, results) => {
//     if (err) {
//       callback(err);
//     } else {
//       callback(null, results);
//     }
//   });
// };

module.exports = {
  // insertOverall,
  // insertData,
  getOverallData,
  getReviewsData,
  updateData
};