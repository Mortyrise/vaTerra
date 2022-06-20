// Let's check if we need this
// import type {StackNavigationProp} from '@react-navigation/stack';

type Temp = {
  celsius: number;
  fahrenheit: number;
};

export type TPlant = {
  id: number;
  latin: string;
  family: string;
  common: string[];
  category: string;
  origin: string;
  climate: string;
  tempmax: Temp;
  tempmin: Temp;
  ideallight: string;
  toleratedlight: string;
  watering: string;
  insects: string[];
  diseases: string;
  use: string[];
};
