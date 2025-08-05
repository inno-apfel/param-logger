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
beforeAll(async () => {
    await resetTestDatabase();
    testData = await seedTestDatabase();
});

describe('Auth Routes', () => {

  test('POST /auth/signup creates new user', async () => {
    const res = await request(app).post('/auth/signup').send({
      username: 'newUser123',
      password: 'Secure@Pass1'
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('username', 'newUser123');
  });

  test('POST /auth/signup fails validation with bad username and password', async () => {
    const res = await request(app).post('/auth/signup').send({
        username: '-invalidUser!', // invalid format
        password: 'pass'           // too short & too weak
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('messages');
    expect(Array.isArray(res.body.messages)).toBe(true);

    expect(res.body.messages).toEqual(
        expect.arrayContaining([
            "Username can only contain letters, numbers, dots, hyphens, and underscores",
            "Username cannot start or end with special characters",
            "Password must be between 8-128 characters",
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ])
    );
    });

    test('POST /auth/signup fails when username already exists', async () => {
        const username = 'duplicateUser';
        const password = 'Password@123';

        // First signup should succeed
        const firstRes = await request(app).post('/auth/signup').send({ username, password });
        expect(firstRes.status).toBe(201);
        expect(firstRes.body).toHaveProperty('username', username);

        // Second signup with same username should fail
        const secondRes = await request(app).post('/auth/signup').send({ username, password });
        expect(secondRes.status).toBe(500); // Change to 409 when duplicate username error is implemented
    });

  test('POST /auth/login/password authenticates user with correct credentials', async () => {
    const res = await request(app).post('/auth/login/password').send({
      username: testData.users[0].username,
      password: testData.users[0].password,
    });

    expect(res.status).toBe(200);
  });

  test('POST /auth/login/password rejects invalid credentials', async () => {
    const res = await request(app).post('/auth/login/password').send({
      username: testData.users[0].username,
      password: 'WrongPassword123!',
    });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('messages');
  });

  test('GET /auth/me returns current user if authenticated', async () => {
    const agent = request.agent(app);

    const login = await agent.post('/auth/login/password').send({
      username: testData.users[0].username,
      password: testData.users[0].password,
    });

    expect(login.status).toBe(200);

    const res = await agent.get('/auth/me');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', testData.users[0].id);
    expect(res.body).toHaveProperty('username', testData.users[0].username);
  });

  test('GET /auth/me returns 401 if unauthenticated', async () => {
    const res = await request(app).get('/auth/me');
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('messages');
  });

  test('POST /auth/logout logs out authenticated user', async () => {
    const agent = request.agent(app);

    const login = await agent.post('/auth/login/password').send({
      username: testData.users[0].username,
      password: testData.users[0].password,
    });
    expect(login.status).toBe(200);

    const logout = await agent.post('/auth/logout');
    expect(logout.status).toBe(200);

    const checkAuth = await agent.get('/auth/me');
    expect(checkAuth.status).toBe(401);
  });

  test('POST /auth/logout returns 200 even when not logged in', async () => {
    const res = await request(app).post('/auth/logout');
    expect(res.status).toBe(200);
  });

});