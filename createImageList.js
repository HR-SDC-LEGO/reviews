/* eslint-disable no-useless-escape */
const fs = require('fs');

const writer = fs.createWriteStream('imageList.js');

for (let i = 1; i <= 1000; i++) {
  writer.write(`\"https://picsum.photos/id/${i}/300/300\",\n`);
}