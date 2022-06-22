"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Plant = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const object = require('../credentials');
if (!process.env.MONGO_CONNECT)
    throw new Error('No connection string');
mongoose_1.default.connect(process.env.MONGO_CONNECT)
    .then(() => {
    console.log('🔥🔥Mongo DB Connected 🔥🔥');
})
    .catch((error) => console.log('Connection error:', error));
// 2. Create a Schema corresponding to the document interface.
const plantSchema = new mongoose_1.Schema({
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
const userSchema = new mongoose_1.Schema({
    userId: { type: Number },
    userName: { type: String },
    userEmail: { type: String },
    userPassword: { type: String },
    plants: { type: [plantSchema] },
});
exports.Plant = (0, mongoose_1.model)(`plants`, plantSchema);
exports.User = (0, mongoose_1.model)(`users`, userSchema);
