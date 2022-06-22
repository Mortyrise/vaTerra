const missingIncorrectPlantData = {} as any;
const correctPlantData = {
  id: 0,
  latin: 'Aeschynanthus lobianus',
  family: 'Gesneriaceae',
  common: ['Lipstick'],
  category: 'Hanging',
  origin: 'Java',
  climate: 'Tropical',
  tempmax: {
    celsius: 32,
    fahrenheit: 89.6,
  },
  tempmin: {
    celsius: 14,
    fahrenheit: 57.2,
  },
  ideallight: 'Bright light',
  toleratedlight: 'Direct sunlight',
  watering: 'Keep moist between watering. Can be a bit dry between watering',
  insects: ['Mealy bug', 'Aphid', 'Thrips'],
  diseases: 'N/A',
  use: ['Hanging', 'Flower', 'Tertiary'],
};

const missingUserData = {};
const correctUserData = {
  userName: 'new User',
  userEmail: 'test@test.nl',
  userPassword: 'thisShouldBehashed',
};

const dummyData = {
  missingIncorrectPlantData: missingIncorrectPlantData,
  correctPlantData: correctPlantData,
  missingUserData: missingUserData,
  correctUserData: correctUserData,
};

export default dummyData;
