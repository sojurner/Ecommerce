import 'dotenv/config';

export const app: string = `http://localhost:${process.env.PORT}/api`;
export const database: string = process.env.MONGO_URI;

export const endPoints = {
  register: '/auth/register',
  login: '/auth/login',
  favorites: '/favorite',
  favoritesByUser: '/favorite/user/',
};
