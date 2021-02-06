const fs = require('fs');
const faker = require('faker');
const moment = require('moment');
const csvWriter = require('csv-write-stream');
const { imageList } = require('./imageList');
const writer = csvWriter();

// node --max-old-space-size=8192 dataGeneration.js

const generateProducts = () => {
  writer.pipe(fs.createWriteStream('products1.csv', { flags: 'a' }));
  for (let i = 1; i <= 10000000; i++) {
    writer.write({
      product_id: i,
      product_name: faker.commerce.productName()
    });
  }
  writer.end();
  console.log('DONE!!!');
};

// generateProducts();

const randomImages = () => {
  const random = Math.floor(Math.random() * 5);
  const images = new Array(random).fill(faker.random.arrayElement(imageList));
  return `{${images.join(', ')}}`;
};

const generateReviews = () => {
  writer.pipe(fs.createWriteStream('reviews2.csv'));
  for (let i = 500001; i <= 1000000; i++) {
    console.log(i);
    const rand = Math.floor(Math.random() * 15);
    for (let j = 0; j <= rand; j++) {
      writer.write({
        product_id: i,
        review_date: moment(faker.date.past()).format('L'),
        rating: faker.random.number({ 'min': 1, 'max': 5 }),
        review_title: faker.lorem.words(),
        username: faker.internet.userName(),
        age_range: faker.random.arrayElement(['14-18', '19-24', '25-34', '35-44', '45-54', '55-64', '65 or older']),
        would_recommend: faker.random.arrayElement([true, false]),
        purchased_for: faker.random.arrayElement(['Son', 'Daughter', 'Granddaughter', 'Grandson', 'Friend or Family Member\'s Child', 'Friend', 'Self']),
        review_body: faker.lorem.paragraphs(2),
        user_images: randomImages(),
        play_experience: faker.random.number({ 'min': 1, 'max': 5 }),
        level_of_difficulty: faker.random.number({ 'min': 1, 'max': 5 }),
        value_for_money: faker.random.number({ 'min': 1, 'max': 5 }),
        build_days: faker.random.number({ 'min': 0, 'max': 30 }),
        build_hours: faker.random.number({ 'min': 0, 'max': 23 }),
        build_mins: faker.random.number({ 'min': 0, 'max': 59 }),
        building_experience: faker.random.number({ 'min': 1, 'max': 4 }),
        helpful: faker.random.number({ 'min': 0, 'max': 100 }),
        not_helpful: faker.random.number({ 'min': 1, 'max': 100 })
      });
    }
  }
  writer.end();
  console.log('DONE!!!');
};
generateReviews();

// const generateReviews2 = () => {
//   writer.pipe(fs.createWriteStream('reviews3.csv'));
//   let i = 100;
//   let innerLoops = -1;
//   let ok = true;

//   function write() {
//     while (i && ok) {
//       if (innerLoops === -1) {
//         innerLoops = Math.floor(Math.random() * 15);
//       }
//       console.log(i, innerLoops);
//       while (innerLoops > 0 && ok) {
//         ok = writer.write({
//           product_id: i,
//           review_date: moment(faker.date.past()).format('L'),
//           rating: faker.random.number({ 'min': 1, 'max': 5 }),
//           review_title: faker.lorem.words(),
//           username: faker.internet.userName(),
//           age_range: faker.random.arrayElement(['14-18', '19-24', '25-34', '35-44', '45-54', '55-64', '65 or older']),
//           would_recommend: innerLoops % 2 === 0,
//           purchased_for: faker.random.arrayElement(['Son', 'Daughter', 'Granddaughter', 'Grandson', 'Friend or Family Member\'s Child', 'Friend', 'Self']),
//           review_body: faker.lorem.paragraphs(),
//           user_images: randomImages(),
//           play_experience: faker.random.number({ 'min': 1, 'max': 5 }),
//           level_of_difficulty: faker.random.number({ 'min': 1, 'max': 5 }),
//           value_for_money: faker.random.number({ 'min': 1, 'max': 5 }),
//           build_days: faker.random.number({ 'min': 0, 'max': 30 }),
//           build_hours: faker.random.number({ 'min': 0, 'max': 23 }),
//           build_mins: faker.random.number({ 'min': 0, 'max': 59 }),
//           building_experience: faker.random.number({ 'min': 1, 'max': 4 }),
//           helpful: faker.random.number({ 'min': 0, 'max': 100 }),
//           not_helpful: faker.random.number({ 'min': 1, 'max': 100 })
//         });
//         innerLoops -= 1;
//       }
//       innerLoops = -1;
//       i -= 1;
//     }
//     if (i > 0) {
//       writer.once('drain', write);
//     }
//     // writer.end();
//   }
//   write();
// };

// generateReviews2();

// function writeOneMillionTimes() {
//   writer.pipe(fs.createWriteStream('reviews4.csv'));
//   let i = 1000000;
//   function write() {
//     console.log(i);
//     let ok = true;
//     do {
//       i--;
//       if (i === 0) {
//         // Last time!
//         writer.write({i});
//       } else {
//         // See if we should continue, or wait.
//         // Don't pass the callback, because we're not done yet.
//         ok = writer.write({i});
//       }
//     } while (i > 0 && ok);
//     if (i > 0) {
//       // Had to stop early!
//       // Write some more once it drains.
//       writer.once('drain', write);
//     }
//   }
//   write();
// }

// writeOneMillionTimes();