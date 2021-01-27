const mysql = require('mysql');
const key = require('./config/key.js');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: key,
  database: 'reviews'
});

connection.connect();

const getReviewsData = (product_id, callback) => {
  // console.log(product_id);
  let sql = 'SELECT * FROM reviewList WHERE product_id = ? ';

  connection.query(sql, product_id, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

const insertData = (fakeData, callback) => {
  for (let data of fakeData) {
    const key = Object.keys(data)[0];
    const arrData = data[key];
    for (let eachData of arrData) {
      connection.query(`INSERT INTO ${key} SET ?`, eachData, (err, results) => {
        if (err) {
          callback(err);
        } else {
          callback(null, results);
        }
      });
    }
  }
};

const insertOverall = (fakeData, callback) => {
  // console.log(fakeData)
  connection.query('INSERT INTO overall SET ?', fakeData, (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  insertOverall,
  insertData,
  getReviewsData
};
