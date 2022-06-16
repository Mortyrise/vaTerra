const { Plant, User } = require('../model/model');
// const sendPushNotification = require('../utilities/pushNotifications');

const findBySpecies = async function (req, res) {
  try {
    console.log(req.body, 'reqbody');
    const onePlant = await Plant.find({ common: { $in: [req.body.common] } });
    res.status(200);
    res.send(onePlant);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const findAllPlants = async function (req, res) {
  const allPlants = await Plant.find();
  res.status(200);
  res.send(allPlants);
};

const findPlantById = async function (req, res) {
  try {
    const plantToAdd = await Plant.findById(req.body.id);
    res.status(200);
    res.send(plantToAdd);
  } catch (error) {
    console.log(error);
  }
};

const findPlantByLatin = async function (req, res) {
  try {
    const plantToAdd = await Plant.findById(req.body.latin);
    res.status(200);
    res.send(plantToAdd);
  } catch (error) {
    console.log(error);
  }
};

const addUser = async function (req, res) {
  try {
    const userAdded = await User.create(req.body);
    res.status(201);
    res.send(userAdded);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const removeUser = async function (req, res) {
  try {
    await User.findByIdAndDelete(req.body.userId);
    res.status(204);
    res.send('User deleted');
  } catch (error) {
    console.log(error);
  }
};

const findUser = async function (req, res) {
  try {
    const userAdded = await User.findOne({ userId: req.params.id });
    res.status(201);
    res.send(userAdded);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const findAllUsers = async function (req, res) {
  try {
    const users = await User.find();
    res.status(200);
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const addPlantByUser = async function (req, res) {
  try {
    const userToUpdate = await User.findOne({ userId: 8 });
    const plantToAdd = req.body;
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
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const removePlantByUser = async function (req, res) {
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

const increaseReminder = async function (req, res) {
  try {
    let plant = req.body.plant;
    let array = [];
    let reminderInterval = plant.wateringReminderInterval;
    let find = await User.findById(req.body.user._id);
    for (let el of find.plantsArray) {
      if (el.id === plant.id) {
        el.nextReminderDate = Date.now() + reminderInterval * 1000 * 3600 * 24;
        array.push(el);
      } else {
        array.push(el);
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

const updateReminder = async function (req, res) {
  try {
    let plant = req.body.plant;
    let array = [];
    let find = await User.findById(req.body.user._id);

    for (let el of find.plantsArray) {
      if (el.id === plant.id) {
        el.wateringReminderInterval = req.body.newInterval;
        array.push(el);
      } else {
        array.push(el);
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

module.exports = {
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
