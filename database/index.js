const mysql = require('mysql');
const key = require('./config/key.js');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: key,
  database: 'PROJECT'
});

connection.connect();

const getReviewsData = (product_id, callback) => {
  connection.query('SELECT * FROM reviewList WHERE product_id = ?', product_id, (err, data) => {
    if (err) {
      callback(err);
    } else {
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
  const helpfulData = data[0].helpful_yes || data[0].helpful_no;
  const updateKey = Object.keys(data[0])[0];
  connection.query(`UPDATE reviewList SET ${updateKey} = ? WHERE id = ?`, [helpfulData, data[1]], (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(results);
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