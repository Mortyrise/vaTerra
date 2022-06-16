const Mongoose = require('mongoose');
// const object = require('../credentials');

Mongoose.connect(
  `mongodb+srv://arod90:spitfire@cluster0.oiuln.mongodb.net/test`
);

const plantSchema = new Mongoose.Schema({
  id: Number,
  latin: String,
  family: String,
  common: [String],
  category: String,
  origin: String,
  climate: String,
  tempMax: {
    celsius: String,
    fahrenheit: String,
  },
  tempMin: {
    celsius: String,
    fahrenheit: String,
  },
  ideallight: String,
  toleratedlight: String,
  watering: String,
  disease: String,
  use: [String],
  imagePath: String,
  nickName: String,
  wateringReminderInterval: Number,
  nextReminderDate: {
    type: Date,
  },
});

const userSchema = new Mongoose.Schema({
  userId: Number,
  userEmail: String,
  userPassword: String,
  plantsArray: [plantSchema],
});

const Plant = Mongoose.model(`allPlants`, plantSchema);
const User = Mongoose.model(`users`, userSchema);
module.exports = { Plant, User };
