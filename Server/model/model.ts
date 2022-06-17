const Mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
// const object = require('../credentials');

Mongoose.connect(process.env.MONGO_CONNECT);

const plantSchema = new Mongoose.Schema({
  id: { type: Number },
  latin: { type: String },
  family: { type: String },
  common: { type: [String] },
  category: { type: String },
  origin: { type: String },
  climate: { type: String },
  tempMax: {
    celsius: { type: String },
    fahrenheit: { type: String },
  },
  tempMin: {
    celsius: { type: String },
    fahrenheit: { type: String },
  },
  ideallight: { type: String },
  toleratedlight: { type: String },
  watering: { type: String },
  disease: { type: String },
  use: { type: [String] },
  imagePath: { type: String },
  nickName: { type: String },
  wateringReminderInterval: { type: Number },
  nextReminderDate: {
    type: { type: Date },
  },
});

const userSchema = new Mongoose.Schema({
  userId: { type: Number },
  userEmail: { type: String },
  userPassword: { type: String },
  plantsArray: { type: [plantSchema] },
});

export const Plant = Mongoose.model(`plants`, plantSchema);
export const User = Mongoose.model(`users`, userSchema);
