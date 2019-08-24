import { HttpStatus } from '@nestjs/common';
import 'dotenv/config';
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import { LoginDTO, RegisterDTO } from '../src/types/auth.dto';
import { app, database } from './constants';

beforeAll(async () => {
  await mongoose.connect(database);
  await mongoose.connection.db.dropDatabase();
});

afterAll(async done => {
  await mongoose.disconnect(done);
});

describe('AUTH', () => {
  const user: RegisterDTO = {
    username: 'username',
    password: 'password',
  };

  it('should register user', () => {
    return request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        expect(body.user.username).toEqual('username');
        expect(body.user.seller).toBeFalsy();
      })
      .expect(HttpStatus.CREATED);
  });
});
