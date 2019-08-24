import 'dotenv/config';

export const app: string = `http://localhost:${process.env.PORT}/api`;
export const database: string = process.env.MONGO_URI;
