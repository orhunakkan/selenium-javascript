import axios from 'axios';
import { expect, describe, it } from 'vitest';
import { faker } from '@faker-js/faker';
import { UserFactory } from '../../fixtures/user-factory';

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
    // Generate random user ID between 1 and 12 (valid IDs for reqres.in)
    const userId = faker.number.int({ min: 1, max: 12 });

    const response = await axios.get(`${baseURL}/users/${userId}`);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('data');
    expect(response.data.data).toHaveProperty('id', userId);
  });

  // Test for Single User (not found)
  it('should return 404 for non-existent user', async () => {
    // Generate invalid user ID (reqres.in has users 1-12)
    const invalidUserId = faker.number.int({ min: 13, max: 99 });

    try {
      await axios.get(`${baseURL}/users/${invalidUserId}`);
      // Should not reach here
      expect(true).toBe(false);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  // Test for Create User
  it('should create a new user', async () => {
    // Generate user data using fixture template and faker
    const userData = UserFactory.createUser();

    const response = await axios.post(`${baseURL}/users`, userData);

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('id');
    expect(response.data).toHaveProperty('createdAt');
    expect(response.data.name).toBe(userData.name);
    expect(response.data.job).toBe(userData.job);
  });

  // Test for Update User (PUT)
  it('should update a user using PUT', async () => {
    // Generate user data using faker directly
    const userData = {
      name: faker.person.fullName(),
      job: faker.person.jobTitle()
    };

    const userId = faker.number.int({ min: 1, max: 12 });
    const response = await axios.put(`${baseURL}/users/${userId}`, userData);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('updatedAt');
    expect(response.data.name).toBe(userData.name);
    expect(response.data.job).toBe(userData.job);
  });

  // Test for Update User (PATCH)
  it('should update a user using PATCH', async () => {
    // Generate partial user data for PATCH
    const userData = {
      name: faker.person.fullName()
      // Only updating name to demonstrate PATCH
    };

    const userId = faker.number.int({ min: 1, max: 12 });
    const response = await axios.patch(`${baseURL}/users/${userId}`, userData);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('updatedAt');
    expect(response.data.name).toBe(userData.name);
  });

  // Test for Delete User
  it('should delete a user', async () => {
    const userId = faker.number.int({ min: 1, max: 12 });
    const response = await axios.delete(`${baseURL}/users/${userId}`);

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
    const resourceId = faker.number.int({ min: 1, max: 12 });
    const response = await axios.get(`${baseURL}/unknown/${resourceId}`);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('data');
    expect(response.data.data).toHaveProperty('id', resourceId);
  });

  // Test for Single Resource (not found)
  it('should return 404 for non-existent resource', async () => {
    const invalidResourceId = faker.number.int({ min: 13, max: 99 });

    try {
      await axios.get(`${baseURL}/unknown/${invalidResourceId}`);
      // Should not reach here
      expect(true).toBe(false);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  // Test for Register (successful)
  it('should register a user successfully', async () => {
    // Use successful registration fixture with faker password
    const userData = UserFactory.registerSuccessful();

    const response = await axios.post(`${baseURL}/register`, userData);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('token');
    expect(response.data).toHaveProperty('id');
  });

  // Test for Register (unsuccessful)
  it('should fail to register with missing password', async () => {
    // Use unsuccessful registration fixture with faker email
    const userData = UserFactory.registerUnsuccessful();

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
    // Use fixture with required credentials that work with the API
    const userData = UserFactory.loginSuccessful();

    const response = await axios.post(`${baseURL}/login`, userData);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('token');
  });

  // Test for Login (unsuccessful)
  it('should fail to login with missing password', async () => {
    // Use unsuccessful login fixture with faker email
    const userData = UserFactory.loginUnsuccessful();

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
    // Generate random delay between 1-5 seconds
    const delay = faker.number.int({ min: 1, max: 5 });

    const response = await axios.get(`${baseURL}/users?delay=${delay}`);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('data');
  });
});
