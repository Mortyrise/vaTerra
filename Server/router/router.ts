import express from 'express';
import controller from '../controller/controller';

const router = express.Router();

router.get('/plants', controller.findAllPlants);
router.get('/user/:id', controller.findUser);
router.get('/users/', controller.findAllUsers);
router.post('/user', controller.addUser);
router.put('/user/plant', controller.addPlantByUser);
router.put('/user/plant/reminder', controller.increaseReminder);
router.put('/user/plant/interval', controller.updateReminder);
router.delete('/user/plant/delete/:id', controller.removePlantByUser);
router.delete('/user/:id', controller.removeUser);

router.get('/', (req, res) => {
  res.send('THIS HAS BEEN UPDATED! :)');
  console.log('server got request');
});

export default router;
