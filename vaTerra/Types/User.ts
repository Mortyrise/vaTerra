import Plant from './Plants';

export type User = {
  userId: string;
  userName: string;
  userEmail: string;
  userPassword: string;
  plants: Plant[];
};

export default User;
