import request from 'supertest';
// import app from '../index';
import { describe, expect, test, it, beforeAll, afterAll } from '@jest/globals';
import dummyData from './dummyData';

import Express from 'express';
// import morgan from 'morgan';
import cors from 'cors';
import router from '../router/router';
import mongoose from 'mongoose';

describe('API CALLS', () => {
  const app = Express();
  app.use(cors()).use(Express.json());

  app.use(router);
  const supertest = request(app);

  it('Started testing', () => {
    expect(true).toBe(true);
  });

  test('should return 404 for /NoendPoint since it is no end point', async () => {
    const response = await supertest.get('/NoendPoint');
    expect(response.status).toBe(404);
  });

  describe('Plants', () => {
    test('get /Plants should return 200 OK and first plant should be latin: Aeschynanthus lobianus', async () => {
      const response = await supertest.get('/plants');
      console.log('GetResponse', response.body[0].id);
      expect(response.status).toBe(200);
      expect(response.body[0].latin).toBe('Aeschynanthus lobianus');
    });
  });

  describe('USER', () => {
    let userId: string;

    test('post /user should create a new user', async () => {
      const missingUserData = dummyData.missingUserData;
      const correctUserData = dummyData.correctUserData;

      const responseMissingData = await supertest
        .post('/user')
        .send(missingUserData);
      expect(responseMissingData.status).toBe(400);
      const responseCorrectUserData = await supertest
        .post('/user')
        .send(correctUserData);
      expect(responseCorrectUserData.status).toBe(201);

      userId = responseCorrectUserData.body.userId;
    });

    test('User should be able to add a plant', async () => {
      const missingIncorrectPlantData = dummyData.missingIncorrectPlantData;
      const correctPlantData = dummyData.correctPlantData;

      const responseMissingIncorrectPlantData = await supertest
        .put('/user/plant')
        .set('userid', userId)
        .send(missingIncorrectPlantData);
      expect(responseMissingIncorrectPlantData.status).toBe(400);

      const responseCorrectPlantData = await supertest
        .put('/user/plant')
        .set('userid', userId)
        .send(correctPlantData);
      expect(responseCorrectPlantData.status).toBe(201);
    });

    test(`User should be deleted`, async () => {
      const response = await supertest.delete(`/user/${userId}`);
      expect(response.status).toBe(204);

      const response2 = await supertest.delete(`/user/${userId}`);
      expect(response2.status).toBe(404);
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    app.listen().close();
  });
});
