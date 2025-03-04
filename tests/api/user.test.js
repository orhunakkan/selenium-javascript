import axios from 'axios';
import { expect, describe, it } from 'vitest';

// Base URL for all requests
const baseURL = 'https://reqres.in/api';

describe('Reqres API Tests', () => {
  // Test for List Users
  it('should get list of users', async () => {
    const response = await axios.get(`${baseURL}/users?page=2`);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('data');
    expect(response.data).toHaveProperty('page');
  });

  // Test for Single User (found)
  it('should get a single user', async () => {
    const response = await axios.get(`${baseURL}/users/2`);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('data');
    expect(response.data.data).toHaveProperty('id', 2);
  });

  // Test for Single User (not found)
  it('should return 404 for non-existent user', async () => {
    try {
      await axios.get(`${baseURL}/users/23`);
      // Should not reach here
      expect(true).toBe(false);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  // Test for Create User
  it('should create a new user', async () => {
    const userData = {
      name: 'morpheus',
      job: 'leader'
    };

    const response = await axios.post(`${baseURL}/users`, userData);

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('id');
    expect(response.data).toHaveProperty('createdAt');
    expect(response.data.name).toBe('morpheus');
    expect(response.data.job).toBe('leader');
  });

  // Test for Update User (PUT)
  it('should update a user using PUT', async () => {
    const userData = {
      name: 'morpheus',
      job: 'zion resident'
    };

    const response = await axios.put(`${baseURL}/users/2`, userData);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('updatedAt');
    expect(response.data.name).toBe('morpheus');
    expect(response.data.job).toBe('zion resident');
  });

  // Test for Update User (PATCH)
  it('should update a user using PATCH', async () => {
    const userData = {
      name: 'morpheus',
      job: 'zion resident'
    };

    const response = await axios.patch(`${baseURL}/users/2`, userData);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('updatedAt');
    expect(response.data.name).toBe('morpheus');
    expect(response.data.job).toBe('zion resident');
  });

  // Test for Delete User
  it('should delete a user', async () => {
    const response = await axios.delete(`${baseURL}/users/2`);

    expect(response.status).toBe(204);
  });

  // Test for List Resources
  it('should get list of resources', async () => {
    const response = await axios.get(`${baseURL}/unknown`);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('data');
  });

  // Test for Single Resource (found)
  it('should get a single resource', async () => {
    const response = await axios.get(`${baseURL}/unknown/2`);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('data');
    expect(response.data.data).toHaveProperty('id', 2);
  });

  // Test for Single Resource (not found)
  it('should return 404 for non-existent resource', async () => {
    try {
      await axios.get(`${baseURL}/unknown/23`);
      // Should not reach here
      expect(true).toBe(false);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  // Test for Register (successful)
  it('should register a user successfully', async () => {
    const userData = {
      email: 'eve.holt@reqres.in',
      password: 'pistol'
    };

    const response = await axios.post(`${baseURL}/register`, userData);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('token');
    expect(response.data).toHaveProperty('id');
  });

  // Test for Register (unsuccessful)
  it('should fail to register with missing password', async () => {
    const userData = {
      email: 'sydney@fife'
    };

    try {
      await axios.post(`${baseURL}/register`, userData);
      // Should not reach here
      expect(true).toBe(false);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('error');
    }
  });

  // Test for Login (successful)
  it('should login successfully', async () => {
    const userData = {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    };

    const response = await axios.post(`${baseURL}/login`, userData);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('token');
  });

  // Test for Login (unsuccessful)
  it('should fail to login with missing password', async () => {
    const userData = {
      email: 'peter@klaven'
    };

    try {
      await axios.post(`${baseURL}/login`, userData);
      // Should not reach here
      expect(true).toBe(false);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('error');
    }
  });

  // Test for List Users with Delay
  it('should get list of users with delay', async () => {
    const response = await axios.get(`${baseURL}/users?delay=3`);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('data');
  });
});
