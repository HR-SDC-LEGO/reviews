const faker = require('faker');

function generateReviews() {
  var reviews = []
  for (var i = 1; i < 6; i++) {
    var reviewNumber = Math.floor(Math.random() * 20 + 30)
    for (var j = 1; j < reviewNumber; j++) {
      var dateCreate = faker.date.past();
      var overallRating = faker.random.number({ 'min': 1, 'max': 5 });
      var userName = faker.internet.userName();
      var age = faker.random.number({ 'min': 1, 'max': 7 });
      var recommend = faker.random.boolean();
      var purchaseFor = faker.name.firstName();
      var title = faker.name.title();
      var content = faker.lorem.paragraphs();
      var playExperience = faker.random.number({ 'min': 0, 'max': 5 });
      var levelDifficulty = faker.random.number({ 'min': 1, 'max': 5 });
      var valueForMoney = faker.random.number({ 'min': 1, 'max': 5 });
      var buildTime = faker.random.number({ 'min': 3, 'max': 300 });
      var buildingExperience = faker.random.number({ 'min': 0, 'max': 4 });
      var helpfulYes = faker.random.number({ 'min': 0, 'max': 300 });
      var helpfulNo = faker.random.number({ 'min': 0, 'max': 300 });
      var image1 = faker.image.image();
      var image2 = faker.image.image();
      var image3 = faker.image.image();
      var image4 = faker.image.image();
      var image5 = faker.image.image();
      var product_id = i;
      var users_id = j;

      reviews.push({
        "date_create": dateCreate,
        "overall_rate": overallRating,
        "username": userName,
        "age": age,
        "recommend": recommend,
        "purchase_for": purchaseFor,
        "title": title,
        "content": content,
        "play_experience": playExperience,
        "level_difficulty": levelDifficulty,
        "value_for_money": valueForMoney,
        "build_time": buildTime,
        "building_experience": buildingExperience,
        "helpful_yes": helpfulYes,
        "helpful_no": helpfulNo,
        "image1": image1,
        "image2": image2,
        "image3": image3,
        "image4": image4,
        "image5": image5,
        "product_id": i,
        "users_id": j
      })
    }
  }
  return { "reviewList": reviews }
}

// console.log(generateReviews());

function generateUsers() {

  var users = []

  for (var id = 0; id < 50; id++) {
    var firstName = faker.name.firstName()
    var lastName = faker.name.lastName()

    users.push({
      "first_name": firstName,
      "last_name": lastName,
    })
  }
  return { "users": users }
}
// console.log(generateUsers());

function generateProducts() {

  var products = []

  for (var id = 0; id < 5; id++) {
    var item_name = faker.commerce.productName()

    products.push({
      "item_name": item_name,
    })
  }
  return { "products": products }
}

// console.log(generateProducts());

module.exports = {
  generateReviews,
  generateUsers,
  generateProducts
}