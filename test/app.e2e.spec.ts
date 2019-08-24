import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as argon from 'argon2';
import * as request from 'supertest';
import { RegisterDTO } from 'src/types/auth.dto';
import { HttpStatus } from '@nestjs/common';

import { app } from './constants';

describe('Root', () => {
  it('should ping', () => {
    return request(app)
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
