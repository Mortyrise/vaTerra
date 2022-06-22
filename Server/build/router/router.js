'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const controller_1 = __importDefault(require('../controller/controller'));
const router = express_1.default.Router();
router.get('/plants', controller_1.default.findAllPlants);
router.get('/user/:id', controller_1.default.findUser);
router.get('/users/', controller_1.default.findAllUsers);
router.post('/user', controller_1.default.addUser);
router.put('/user/plant', controller_1.default.addPlantByUser);
router.put('/user/plant/reminder', controller_1.default.increaseReminder);
router.put('/user/plant/interval', controller_1.default.updateReminder);
router.delete('user/plant/delete/:id', controller_1.default.removePlantByUser);
router.delete('user/:id', controller_1.default.removeUser);
router.get('/', (req, res) => {
  res.send('Hello Andres, awesome frontend!');
  console.log('server got request');
});
exports.default = router;
