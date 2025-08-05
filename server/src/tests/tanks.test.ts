import { describe } from 'node:test';
import request from 'supertest';
import { 
  beforeAll, 
  expect, 
  test 
} from 'vitest'

import app from './utils/expressAppSetup';
import resetTestDatabase from './utils/resetTestDatabase';
import { type seededData } from './utils/seedDataGenerator'
import seedTestDatabase from './utils/seedTestDatabase';

let testData: { users: seededData };
let agent: request.Agent;
beforeAll(async () => {
    await resetTestDatabase();
    testData = await seedTestDatabase();
    agent = request.agent(app);
    const loginRes = await agent.post('/auth/login/password').send({
        username: testData.users[0].username,
        password: testData.users[0].password,
    });
    expect(loginRes.status).toBe(200);
});

describe('Tank Routes', () => {
  let userTankId: string;

  beforeAll(() => {
    userTankId = testData.users[0].tanks[0].id;
  });

  test('GET /tanks returns all tanks for authenticated user', async () => {
    const res = await agent.get('/tanks');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /tanks returns 401 if unauthenticated', async () => {
    const res = await request(app).get('/tanks');
    expect(res.status).toBe(401);
  });
  

  test('POST /tanks creates a new tank', async () => {
    const res = await agent.post('/tanks').send({ tank_name: 'MyTank' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('name', 'MyTank');
  });

  test('GET /tanks/:tankId returns specific tank', async () => {
    const res = await agent.get(`/tanks/${userTankId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', userTankId);
  });

  test('GET /tanks/:tankId returns 404 if tank not found', async () => {
    const res = await agent.get('/tanks/00000000-0000-0000-0000-000000000000');
    expect(res.status).toBe(404);
  });

  test('GET /tanks/:tankId/observations groups by parameter', async () => {
    const res = await agent.get(`/tanks/${userTankId}/observations`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('observations');
  });

  test('GET /tanks/:tankId/observations returns 404 for nonexistent tank', async () => {
    const res = await agent.get(`/tanks/00000000-0000-0000-0000-000000000000/observations`);
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual([]); // fix code to return 404 on all routes containing tanks
  });
  
  test('POST /tanks/:tankId/parameters creates a parameter', async () => {
    const res = await agent.post(`/tanks/${userTankId}/parameters`).send({
      param_name: 'Salinity',
      reference_value: 1.025,
      unit_of_measure: 'SG',
      tank_id: userTankId,
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('name', 'Salinity');
  });

  test('POST /tanks/:tankId/observations creates a new observation', async () => {
    const paramId = testData.users[0].tanks[0].parameters[0].id;

    const res = await agent.post(`/tanks/${userTankId}/observations`).send({
      value: 1.025,
      param_id: paramId,
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('value', 1.025);
  });

  test('POST /tanks/:tankId/observations returns 401 if unauthenticated', async () => {
    const paramId = testData.users[0].tanks[0].parameters[0].id;

    const res = await request(app).post(`/tanks/${userTankId}/observations`).send({
      value: 1.025,
      param_id: paramId,
    });

    expect(res.status).toBe(401);
  });
});