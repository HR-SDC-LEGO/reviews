const fs = require('fs');
const faker = require('faker');
const moment = require('moment');
const csvWriter = require('csv-write-stream');
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

// const randomAgeRange = () => {
//   const choices = ['14-18', '19-24', '25-34', '35-44', '45-54', '55-64', '65 or older'];
//   const random = Math.floor(Math.random() * choices.length);
//   return choices[random];
// };

// const randomPurchasedFor = () => {
//   const choices = ['Son', 'Daughter', 'Granddaughter', 'Grandson', 'Friend or Family Member\'s Child', 'Friend', 'Self'];
//   const random = Math.floor(Math.random() * choices.length);
//   return choices[random];
// };

const randomImages = () => {
  const random = Math.floor(Math.random() * 5);
  const images = new Array(random).fill(faker.random.image());
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
        would_recommend: j % 2 === 0,
        purchased_for: faker.random.arrayElement(['Son', 'Daughter', 'Granddaughter', 'Grandson', 'Friend or Family Member\'s Child', 'Friend', 'Self']),
        review_body: faker.lorem.paragraphs(),
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