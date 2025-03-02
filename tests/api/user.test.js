// tests/api/user.test.js
import { describe, it, expect } from 'vitest';
import { UserService } from '../../services/userService.js';
import { AuthService } from '../../services/authService.js';

describe('User API Tests', () => {
  const userService = new UserService();
  const authService = new AuthService();

  it('List Users', async () => {
    const response = await userService.getUsers(2);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('page');
    expect(response.data).toHaveProperty('data');
  });

  it('Single User - Found', async () => {
    const response = await userService.getUserById(2);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('data');
  });

  it('Single User - Not Found', async () => {
    const response = await userService.getUserById(23);

    expect(response.status).toBe(404);
  });

  it('Create User', async () => {
    const userData = {
      name: 'morpheus',
      job: 'leader'
    };

    const response = await userService.createUser(userData);

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('id');
    expect(response.data).toHaveProperty('createdAt');
  });

  it('Update User - PUT', async () => {
    const userData = {
      name: 'morpheus',
      job: 'zion resident'
    };

    const response = await userService.updateUserWithPut(2, userData);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('updatedAt');
  });

  it('Update User - PATCH', async () => {
    const userData = {
      name: 'morpheus',
      job: 'zion resident'
    };

    const response = await userService.updateUserWithPatch(2, userData);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('updatedAt');
  });

  it('Delete User', async () => {
    const response = await userService.deleteUser(2);

    expect(response.status).toBe(204);
  });

  it('List Resources', async () => {
    const response = await userService.apiClient.get('/unknown');

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('data');
  });

  it('Single Resource - Found', async () => {
    const response = await userService.apiClient.get('/unknown/2');

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('data');
  });

  it('Single Resource - Not Found', async () => {
    const response = await userService.apiClient.get('/unknown/23');

    expect(response.status).toBe(404);
  });

  it('Register - Successful', async () => {
    const registrationData = {
      email: 'eve.holt@reqres.in',
      password: 'pistol'
    };

    const response = await authService.register(registrationData);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('token');
    expect(response.data).toHaveProperty('id');
  });

  it('Register - Unsuccessful', async () => {
    const registrationData = {
      email: 'sydney@fife'
    };

    const response = await authService.register(registrationData);

    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty('error');
  });

  it('Login - Successful', async () => {
    const loginData = {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    };

    const response = await authService.login(loginData);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('token');
  });

  it('Login - Unsuccessful', async () => {
    const loginData = {
      email: 'peter@klaven'
    };

    const response = await authService.login(loginData);

    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty('error');
  });

  it('List Users with Delay', async () => {
    const response = await userService.apiClient.get('/users?delay=3');

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('data');
  });
});
