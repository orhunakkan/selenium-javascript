import { describe, it, expect } from 'vitest';
import axios from 'axios';

describe('Reqres API Tests', () => {
  const baseUrl = 'https://reqres.in/api';
  const client = axios.create({
    baseURL: baseUrl,
    validateStatus: null
  });

  it('List Users', async () => {
    const response = await client.get('/users?page=2');

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('page');
    expect(response.data).toHaveProperty('data');
  });

  it('Single User - Found', async () => {
    const response = await client.get('/users/2');

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('data');
  });

  it('Single User - Not Found', async () => {
    const response = await client.get('/users/23');

    expect(response.status).toBe(404);
  });

  it('Create User', async () => {
    const response = await client.post('/users', {
      name: 'morpheus',
      job: 'leader'
    });

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('id');
    expect(response.data).toHaveProperty('createdAt');
  });

  it('Update User - PUT', async () => {
    const response = await client.put('/users/2', {
      name: 'morpheus',
      job: 'zion resident'
    });

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('updatedAt');
  });

  it('Update User - PATCH', async () => {
    const response = await client.patch('/users/2', {
      name: 'morpheus',
      job: 'zion resident'
    });

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('updatedAt');
  });

  it('Delete User', async () => {
    const response = await client.delete('/users/2');

    expect(response.status).toBe(204);
  });

  it('List Resources', async () => {
    const response = await client.get('/unknown');

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('data');
  });

  it('Single Resource - Found', async () => {
    const response = await client.get('/unknown/2');

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('data');
  });

  it('Single Resource - Not Found', async () => {
    const response = await client.get('/unknown/23');

    expect(response.status).toBe(404);
  });

  it('Register - Successful', async () => {
    const response = await client.post('/register', {
      email: 'eve.holt@reqres.in',
      password: 'pistol'
    });

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('token');
    expect(response.data).toHaveProperty('id');
  });

  it('Register - Unsuccessful', async () => {
    const response = await client.post('/register', {
      email: 'sydney@fife'
    });

    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty('error');
  });

  it('Login - Successful', async () => {
    const response = await client.post('/login', {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    });

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('token');
  });

  it('Login - Unsuccessful', async () => {
    const response = await client.post('/login', {
      email: 'peter@klaven'
    });

    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty('error');
  });

  it('List Users with Delay', async () => {
    const response = await client.get('/users?delay=3');

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('data');
  });
});
