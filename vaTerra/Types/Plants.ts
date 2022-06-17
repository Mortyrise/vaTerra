// Let's check if we need this
// import type {StackNavigationProp} from '@react-navigation/stack';

export type Tempmax = {
  celsius: number;
  fahrenheit: number;
};

export type Tempmin = {
  celsius: number;
  fahrenheit: number;
};

export type Plant = {
  id: number;
  latin: string;
  family: string;
  common: string[];
  category: string;
  origin: string;
  climate: string;
  tempmax: Tempmax;
  tempmin: Tempmin;
  ideallight: string;
  toleratedlight: string;
  watering: string;
  insects: string[];
  diseases: string;
  use: string[];
};
