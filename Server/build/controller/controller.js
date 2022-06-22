"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../model/model");
// const sendPushNotification = require('../utilities/pushNotifications');
const findBySpecies = async function (req, res) {
    try {
        const onePlant = await model_1.Plant.find({ common: { $in: [req.body.common] } });
        res.status(200);
        res.send(onePlant);
    }
    catch (error) {
        console.log(error);
        res.status(500);
    }
};
const findAllPlants = async function (req, res) {
    const allPlants = await model_1.Plant.find();
    res.status(200);
    res.send(allPlants);
};
const findPlantById = async function (req, res) {
    try {
        const plantToAdd = await model_1.Plant.findById(req.body.id);
        res.status(200);
        res.send(plantToAdd);
    }
    catch (error) {
        console.log(error);
    }
};
const findPlantByLatin = async function (req, res) {
    try {
        const plantToAdd = await model_1.Plant.findById(req.body.latin);
        res.status(200);
        res.send(plantToAdd);
    }
    catch (error) {
        console.log(error);
    }
};
const addUser = async function (req, res) {
    try {
        //Should check on all required fields
        const userToAdd = {
            //TODO userID is now a number but should be a string
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userPassword: req.body.userPassword,
            userId: Math.floor(Math.random() * 1000000),
        };
        if (!userToAdd.userName ||
            !userToAdd.userEmail ||
            !userToAdd.userPassword) {
            res.status(400);
            return res.send(`The following fields are missing: ${!userToAdd.userName ? 'userName' : ''} ${!userToAdd.userEmail ? 'userEmail' : ''} ${!userToAdd.userPassword ? 'userPassword' : ''}`);
        }
        let userFound = await model_1.User.findOne({ userId: userToAdd.userId });
        while (userFound) {
            userToAdd.userId = Math.floor(Math.random() * 1000000);
            userFound = await model_1.User.findOne({ userId: userToAdd.userId });
        }
        const userAdded = await model_1.User.create(userToAdd);
        res.status(201);
        res.send(userAdded);
    }
    catch (error) {
        console.log(error);
        res.status(500);
    }
};
const removeUser = async function (req, res) {
    try {
        const userId = req.headers.userid;
        await model_1.User.deleteOne({ userId: userId });
        res.status(204);
        res.send('User deleted');
    }
    catch (error) {
        console.log(error);
    }
};
const findUser = async function (req, res) {
    try {
        const user = await model_1.User.findOne({ userId: req.params.id });
        if (!user) {
            res.send('user not found');
            res.status(404);
        }
        res.status(201);
        res.send(user);
    }
    catch (error) {
        console.log(error);
        res.status(500);
    }
};
const findAllUsers = async function (req, res) {
    try {
        const users = await model_1.User.find();
        res.status(200);
        res.send(users);
    }
    catch (error) {
        console.log(error);
        res.status(500);
    }
};
const addPlantByUser = async function (req, res) {
    try {
        console.log(req.headers);
        const userId = req.headers.userid ? req.headers.userid : 1;
        console.log('addPlantByUser', userId);
        //TODO Add get user by id from req.body.user?
        let user = await model_1.User.findOne({ userId: userId });
        if (!user) {
            res.status(404);
            return res.send('User not found');
        }
        const plantToAdd = req.body;
        //check body for all required fields <- Still missing a lot of fields
        if (!plantToAdd.common || !plantToAdd.latin) {
            res.status(400);
            return res.send(`The following fields are missing: 
        ${!plantToAdd.common ? 'common' : ''} 
        ${!plantToAdd.latin ? 'latin' : ''}`);
        }
        console.log('addPlantByUser', plantToAdd);
        if (user) {
            await model_1.User.updateOne({ userId: user.userId }, {
                $push: {
                    plants: plantToAdd,
                },
            });
            res.status(201);
            res.send(user);
        }
        else {
            res.status(500);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500);
    }
};
const removePlantByUser = async function (req, res) {
    try {
        await model_1.User.findByIdAndUpdate(req.params.id, {
            $pull: { plants: { _id: req.body._id } },
        }, {
            returnDocument: 'after',
        });
        res.status(204);
        res.send('Deleted');
    }
    catch (error) {
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
        let find = await model_1.User.findById(req.body.user._id);
        if (!find)
            throw new Error('User not found');
        if (!find.plants)
            throw new Error('User has no plants');
        for (let plant of find.plants) {
            if (plant.id === plant.id) {
                plant.nextReminderDate = new Date(Date.now() + reminderInterval * 1000 * 3600 * 24);
                array.push(plant);
            }
            else {
                array.push(plant);
            }
        }
        let user = await model_1.User.findByIdAndUpdate(req.body.user._id, {
            $set: {
                plants: array,
            },
        }, {
            returnDocument: 'after',
        });
        res.status(201);
        res.send(user);
    }
    catch (error) {
        console.log(error);
    }
};
const updateReminder = async function (req, res) {
    try {
        let plant = req.body.plant;
        let array = [];
        let find = await model_1.User.findById(req.body.user._id);
        if (!find)
            throw new Error('User not found');
        if (!find.plants)
            throw new Error('User has no plants');
        for (let plant of find.plants) {
            if (plant.id === plant.id) {
                plant.wateringReminderInterval = req.body.newInterval;
                array.push(plant);
            }
            else {
                array.push(plant);
            }
        }
        let user = await model_1.User.findByIdAndUpdate(req.body.user._id, {
            $set: {
                plants: array,
            },
        }, {
            returnDocument: 'after',
        });
        res.status(201);
        res.send(user);
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = {
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
