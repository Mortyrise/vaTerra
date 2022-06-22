//Need to be something like this: 'https://e756-45-130-134-153.eu.ngrok.io/';
//'ngrok http 3111'

import { REACT_APP_SERVER_TUNNEL } from '@env';

const baseUrl = `https://vaterra.herokuapp.com/`;

import Plant from '../Types/Plants';
import User from '../Types/User';

//Get user plants
// const fetchOptions = {
//   method: 'GET',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
// };

export const getPlants = async () => {
  try {
    const result = await fetch(baseUrl + 'plants');
    return await result.json();
  } catch (error) {
    console.log('Error Service-getPlants', error);
  }
  // fetch(baseUrl + 'plants', fetchOptions)
  //   .then((response) => response.json())
  //   .then((response) => {
  //     return response;
  //   });
};

//Get user
export const getUser = async (id: number) => {
  try {
    const result = await fetch(baseUrl + 'user/' + id);
    return await result.json();
  } catch (error) {
    console.log('Error Service-getUser', error);
  }
};

//Post user
export const addUser = async (user: User) => {
  try {
    const data = await fetch(baseUrl + 'user', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return data.json();
  } catch (error) {
    console.log('Error Service-addUser', error);
  }
};

//Delete user
export const removeUser = async (user: User) => {
  try {
    const res = await fetch(baseUrl + `user/${user.userId}`, {
      method: 'DELETE',
    });
    return await res.json();
  } catch (error) {
    console.log('Error Service-delete user', error);
  }
};

//Add Plant to the users plantsArray, "Put"
export const addPlantToUser = async (plantObject: Plant) => {
  console.log('plantObject', plantObject);
  try {
    const plant = await fetch(baseUrl + 'user/plant', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(plantObject),
    });
    return plant.json();
  } catch (error) {
    console.log('Error Service-addPlant', error);
  }
};
//Find User, and update it's plants reminders
export const updateReminder = async (
  user: User,
  plant: Plant,
  newInterval: number
) => {
  try {
    const userToUpdate = await fetch(baseUrl + 'user/plant/interval', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        user: user,
        plant: plant,
        newInterval: newInterval,
      }),
    });
  } catch (error) {
    console.log('Error Service-updateReminder', error);
  }
};

// //body:{
//   plant: {},
//   user: {
//     -id
//   },
//   newInterval: {}
// }
