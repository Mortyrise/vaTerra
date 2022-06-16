const Mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
// const object = require('../credentials');

console.log(process.env);
Mongoose.connect(process.env.MONGO_CONNECT);

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
