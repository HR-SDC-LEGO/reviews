-- CREATE TYPE ages AS ENUM ('14-18', '19-24', '25-34', '35-44', '45-54', '55-64', '65 or older');
-- CREATE TYPE ratings AS ENUM (1, 2, 3, 4, 5);
-- CREATE TYPE recipient AS ENUM ('Son', 'Daughter', 'Granddaughter', 'Grandson', "Friend or Family Member's Child", 'Friend', 'Self');
-- CREATE TYPE difficulty AS ENUM ('Very Easy', 'Easy', 'Average', 'Challenging', 'Very Challenging');

CREATE TABLE products (
  product_id SERIAL NOT NULL PRIMARY KEY,
  product_name VARCHAR(50) NOT NULL,
  product_image VARCHAR(200)
);
-- Example Insert
INSERT INTO products (product_name, product_image) VALUES ('Lego product', 'lego image');


CREATE TABLE reviews (
  review_id SERIAL NOT NULL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products,
  review_date DATE NOT NULL,
  rating SMALLINT NOT NULL,
  review_title VARCHAR(50) NOT NULL,
  username VARCHAR(30) NOT NULL,
  age_range VARCHAR(11) NOT NULL,
  would_recommend BOOLEAN NOT NULL,
  purchased_for VARCHAR(31),
  review_body TEXT NOT NULL,
  user_images VARCHAR(200)[],
  play_experience SMALLINT,
  level_of_difficulty SMALLINT,
  value_for_money SMALLINT,
  build_days SMALLINT NOT NULL,
  build_hours SMALLINT NOT NULL,
  build_mins SMALLINT NOT NULL,
  building_experience VARCHAR(25),
  helpful SMALLINT NOT NULL,
  not_helpful SMALLINT NOT NULL
);

-- Example Insert
INSERT INTO reviews (product_id, review_date, rating, review_title, username, age_range, would_recommend, purchased_for, review_body, user_images, play_experience, level_of_difficulty, value_for_money, build_days, build_hours, build_mins, building_experience, helpful, not_helpful)
VALUES (
  1,
  '2020-01-08',
  5,
  'Heres a title',
  'username',
  '11-22',
  true,
  'Son',
  'Here is the review bodyHere is the review bodyHere is the review bodyHere is the review bodyHere is the review bodyHere is the review bodyHere is the review body',
  '{"heres an image url", "and another one"}',
  4,
  3,
  4,
  1,
  13,
  24,
  'experienced',
  44,
  22
);