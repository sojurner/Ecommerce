import { HttpStatus } from '@nestjs/common';
import 'dotenv/config';
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import { LoginDTO, RegisterDTO } from '../src/types/auth.dto';
import { app, database, endPoints as _endPoints_ } from './constants';

beforeAll(async () => {
  await mongoose.connect(database);
  await mongoose.connection.db.dropDatabase();
});

afterAll(async done => {
  await mongoose.disconnect(done);
});

describe('AUTH', () => {
  let user: RegisterDTO;

  beforeEach(() => {
    user = { username: 'username', password: 'password' };
  });

  it('should register user', () => {
    return request(app)
      .post(_endPoints_.register)
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        expect(body.user.username).toEqual('username');
        expect(body.user.seller).toBeFalsy();
      })
      .expect(HttpStatus.CREATED);
  });

  it('should not register an existing username', () => {
    return request(app)
      .post(_endPoints_.register)
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        expect(body.message).toEqual('User already Exists');
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('should login an authenticated user', () => {
    request(app)
      .post(_endPoints_.login)
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        expect(body.user.username).toEqual('username');
      })
      .expect(HttpStatus.CREATED);
  });
});
