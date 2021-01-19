const mysql = require('mysql');
const key = require('./config/key.js');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: key,
  database: 'fec',
});

connection.connect();

var getReviewsData = (product_id, callback) => {
  connection.query('SELECT * FROM reviewList WHERE product_id = ?', product_id, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

var updateData = (data, callback) => {
  var helpfulData = data[0].helpful_yes || data[0].helpful_no;
  var updateKey = Object.keys(data[0])[0];
  connection.query(`UPDATE reviewList SET ${updateKey} = ? WHERE id = ?`, [helpfulData, data[1]], (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(results);
    }
  });
};


module.exports = {
  getReviewsData,
  updateData
};



// var insertColosseumData = (fakeData, callback) => {
//   for (let data of fakeData) {
//     var key = Object.keys(data)[0]
//     var arrData = data[key];
//     for (let eachData of arrData) {
//       connection.query(`INSERT INTO ${key} SET ?`, eachData, (err, results) => {
//         if (err) {
//           callback(err);
//         } else {
//           callback(null, results);
//         }
//       })
//     }
//   }
// };