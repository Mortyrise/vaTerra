import Mongoose, { Schema, model } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
// const object = require('../credentials');

if (!process.env.MONGO_CONNECT) throw new Error('No connection string');

Mongoose.connect(process.env.MONGO_CONNECT)
  .then(() => {
    console.log('🔥🔥Mongo DB Connected 🔥🔥');
  })
  .catch((error) => console.log('Connection error:', error));

interface ITemp {
  celsius: number;
  fahrenheit: number;
}

interface IPlant {
  id: number;
  latin: string;
  family: string;
  common: string[];
  category: string;
  origin: string;
  climate: string;
  tempMax: ITemp;
  tempMin: ITemp;
  ideallight: string;
  toleratedlight: string;
  watering: string;
  insects: string[];
  disease: string;
  use: string[];
  imagePath: String;
  nickName: String;
  wateringReminderInterval: Number;
  nextWateringReminder: Date;
  nextReminderDate: Date;
}

interface IUser {
  userId: number;
  userName: string;
  userEmail: string;
  userPassword: string;
  plants: IPlant[];
}

// 2. Create a Schema corresponding to the document interface.
const plantSchema = new Schema<IPlant>({
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
  nextReminderDate: { type: Date },
});

const userSchema = new Schema<IUser>({
  userId: { type: Number },
  userName: { type: String },
  userEmail: { type: String },
  userPassword: { type: String },
  plants: { type: [plantSchema] },
});

export const Plant = model(`plants`, plantSchema);
export const User = model(`users`, userSchema);
