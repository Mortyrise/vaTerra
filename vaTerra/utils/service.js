const baseUrl = 'https://73f2-45-130-134-153.eu.ngrok.io/';

//Get user plants
export const getPlants = async () => {
  try {
    const result = await fetch(baseUrl + 'plants');
    return await result.json();
  } catch (error) {
    console.log(error);
  }
};

//Get user
export const getUser = async (id) => {
  try {
    const result = await fetch(baseUrl + 'user/' + id);
    return await result.json();
  } catch (error) {
    console.log(error);
  }
};

//Post user
export const addUser = async (user) => {
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
    console.log(error);
  }
};

//Delete user
export const removeUser = async (user) => {
  try {
    const res = await fetch(baseUrl + `user/${user.userId}`, {
      method: 'DELETE',
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

//Add Plant to the users plantsArray, "Put"
export const addPlantToUser = async (plantObject) => {
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
    console.log(error);
  }
};
//Find User, and update it's plants reminders
export const updateReminder = async (user, plant, newInterval) => {
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
    console.log(error);
  }
};

// //body:{
//   plant: {},
//   user: {
//     -id
//   },
//   newInterval: {}
// }
