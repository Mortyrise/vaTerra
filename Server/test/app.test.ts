import request from 'supertest';
// import app from '../index';
import { describe, expect, test, it, beforeAll, afterAll } from '@jest/globals';

import Express from 'express';
// import morgan from 'morgan';
import cors from 'cors';
import router from '../router/router';
import mongoose from 'mongoose';

describe('Server', () => {
  const app = Express();
  app.use(cors()).use(Express.json());

  app.use(router);
  const supertest = request(app);

  it('Started testing', () => {
    expect(true).toBe(true);
  });

  test('should return 404 for / since it has no end point', async () => {
    const response = await supertest.get('/');
    expect(response.status).toBe(404);
  });

  test('/Plants should return 200 OK and first plant should be latin: Aeschynanthus lobianus', async () => {
    const response = await supertest.get('/plants');
    console.log('GetResponse', response.body[0].id);
    expect(response.status).toBe(200);
    expect(response.body[0].latin).toBe('Aeschynanthus lobianus');
  });

  afterAll(async () => {
    await mongoose.disconnect();
    app.listen().close();
  });
});
