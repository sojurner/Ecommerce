import { HttpStatus } from '@nestjs/common';
import 'dotenv/config';
import axios from 'axios';
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import { LoginDTO, RegisterDTO } from '../src/types/auth.dto';
import { app, database, endPoints as _endPoints_ } from './constants';

let userToken;

const user: RegisterDTO = {
  username: 'stackOverdose0102',
  password: 'joeMama222',
};

beforeAll(async () => {
  await mongoose.connect(database);
  await mongoose.connection.db.dropDatabase();

  const {
    data: { token },
  } = await axios.post(`${app}/${_endPoints_.register}`, user);
  userToken = token;

  await axios.post('');
});

afterAll(async done => {
  await mongoose.disconnect(done);
});

describe('AUTH', () => {
  it('should list all favorites', () => {
    return request(app)
      .get(_endPoints_.favorites)
      .expect(({ body }) => {
        console.log(body);
      })
      .expect(200);
  });

  // it('should create a favorite', () => {});

  // it('should delete a favorite', () => {});

  // it('should update a favorite', () => {});
});
