const mysql = require('mysql');
const key = require('./config/key.js');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: key,
  database: 'fec',
});

connection.connect();

var getColosseumData = (callback) => {
  connection.query('SELECT * FROM users', (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  })
};

var insertColosseumData = (fakeData, callback) => {
  // console.log(fakeData)

  for (let data of fakeData) {
    var key = Object.keys(data)[0]
    var arrData = data[key];
    for (let eachData of arrData) {
      connection.query(`INSERT INTO ${key} SET ?`, eachData, (err, results) => {
        if (err) {
          callback(err);
        } else {
          callback(null, results);
        }
      })
    }
  }
};
module.exports = {
  getColosseumData,
  insertColosseumData,
}