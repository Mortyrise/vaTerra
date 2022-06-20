import { Request, Response } from 'express';
import { Plant, User } from '../model/model';
// const sendPushNotification = require('../utilities/pushNotifications');

const findBySpecies = async function (req: Request, res: Response) {
  try {
    const onePlant = await Plant.find({ common: { $in: [req.body.common] } });
    res.status(200);
    res.send(onePlant);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const findAllPlants = async function (req: Request, res: Response) {
  const allPlants = await Plant.find();
  res.status(200);
  res.send(allPlants);
};

const findPlantById = async function (req: Request, res: Response) {
  try {
    const plantToAdd = await Plant.findById(req.body.id);
    res.status(200);
    res.send(plantToAdd);
  } catch (error) {
    console.log(error);
  }
};

const findPlantByLatin = async function (req: Request, res: Response) {
  try {
    const plantToAdd = await Plant.findById(req.body.latin);
    res.status(200);
    res.send(plantToAdd);
  } catch (error) {
    console.log(error);
  }
};

const addUser = async function (req: Request, res: Response) {
  try {
    const userAdded = await User.create(req.body);
    res.status(201);
    res.send(userAdded);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const removeUser = async function (req: Request, res: Response) {
  try {
    await User.findByIdAndDelete(req.body.userId);
    res.status(204);
    res.send('User deleted');
  } catch (error) {
    console.log(error);
  }
};

const findUser = async function (req: Request, res: Response) {
  try {
    const user = await User.findOne({ userId: req.params.id });
    if (!user) {
      res.send('user not found');
      res.status(404);
    }

    res.status(201);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const findAllUsers = async function (req: Request, res: Response) {
  try {
    const users = await User.find();
    res.status(200);
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const addPlantByUser = async function (req: Request, res: Response) {
  try {
    console.log('addPlantByUser', req.body);
    const userToUpdate = await User.findOne({ userId: 1 });
    const plantToAdd = req.body;

    if (userToUpdate) {
      await User.updateOne(
        { id: userToUpdate.userId },
        {
          $push: {
            plantsArray: plantToAdd,
          },
        }
      );
      const updatedUser = await User.findOne({ userId: 8 });
      console.log(updatedUser);
      res.status(201);
      res.send(updatedUser);
    } else {
      res.status(500);
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const removePlantByUser = async function (req: Request, res: Response) {
  try {
    await User.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { plantsArray: { _id: req.body._id } },
      },
      {
        returnDocument: 'after',
      }
    );
    res.status(204);
    res.send('Deleted');
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send('Something went wrong');
  }
};

const increaseReminder = async function (req: Request, res: Response) {
  try {
    let plant = req.body.plant;
    let array: [] = [];
    let reminderInterval = plant.wateringReminderInterval;
    let find = await User.findById(req.body.user._id);

    if (!find) throw new Error('User not found');
    if (!find.plants) throw new Error('User has no plants');

    for (let plant of find.plants) {
      if (plant.id === plant.id) {
        plant.nextReminderDate = new Date(
          Date.now() + reminderInterval * 1000 * 3600 * 24
        );
        array.push(plant as never);
      } else {
        array.push(plant as never);
      }
    }
    let user = await User.findByIdAndUpdate(
      req.body.user._id,
      {
        $set: {
          plants: array,
        },
      },
      {
        returnDocument: 'after',
      }
    );
    res.status(201);
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};

const updateReminder = async function (req: Request, res: Response) {
  try {
    let plant = req.body.plant;
    let array: [] = [];
    let find = await User.findById(req.body.user._id);

    if (!find) throw new Error('User not found');
    if (!find.plants) throw new Error('User has no plants');

    for (let plant of find.plants) {
      if (plant.id === plant.id) {
        plant.wateringReminderInterval = req.body.newInterval;
        array.push(plant as never);
      } else {
        array.push(plant as never);
      }
    }
    let user = await User.findByIdAndUpdate(
      req.body.user._id,
      {
        $set: {
          plantsArray: array,
        },
      },
      {
        returnDocument: 'after',
      }
    );
    res.status(201);
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};

export default {
  findBySpecies,
  addPlantByUser,
  removePlantByUser,
  addUser,
  findUser,
  findAllUsers,
  findPlantById,
  removeUser,
  findPlantByLatin,
  findAllPlants,
  increaseReminder,
  updateReminder,
};
