// features/step_definitions/api.steps.js
import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'node:assert/strict';
import { UserService } from '../../services/userService.js';
import { AuthService } from '../../services/authService.js';

const userService = new UserService();
const authService = new AuthService();

// Variables to store state between steps
let userData = {};
let registrationData = {};
let loginData = {};
let response = {};

// Generic data storage
Given('I have the following user data:', function (dataTable) {
  userData = dataTable.hashes()[0];
});

Given('I have the following registration data:', function (dataTable) {
  registrationData = dataTable.hashes()[0];
});

Given('I have the following login data:', function (dataTable) {
  loginData = dataTable.hashes()[0];
});

// HTTP methods using services
When('I send GET request to {string}', async function (endpoint) {
  try {
    if (endpoint.startsWith('/users')) {
      if (endpoint.includes('?delay=')) {
        const delay = endpoint.split('?delay=')[1];
        response = await userService.getUsersWithDelay(delay);
      } else if (endpoint.includes('?page=')) {
        const page = endpoint.split('?page=')[1];
        response = await userService.getUsers(page);
      } else if (endpoint.includes('/users/')) {
        const id = endpoint.split('/')[2];
        response = await userService.getUserById(id);
      }
    } else if (endpoint.startsWith('/unknown')) {
      if (endpoint === '/unknown') {
        response = await userService.getResources();
      } else {
        const id = endpoint.split('/')[2];
        response = await userService.getResourceById(id);
      }
    } else {
      // For other endpoints, use the basic client
      const client = userService.apiClient;
      response = await client.get(endpoint);
    }
  } catch (error) {
    console.error(`Error in GET request to ${endpoint}:`, error);
    throw error;
  }
});

When(
  'I send POST request to {string} with user data',
  async function (endpoint) {
    try {
      if (endpoint === '/users') {
        response = await userService.createUser(userData);
      } else {
        const client = userService.apiClient;
        response = await client.post(endpoint, userData);
      }
    } catch (error) {
      console.error(`Error in POST request to ${endpoint}:`, error);
      throw error;
    }
  }
);

When(
  'I send POST request to {string} with registration data',
  async function (endpoint) {
    try {
      if (endpoint === '/register') {
        response = await authService.register(registrationData);
      } else {
        const client = authService.apiClient;
        response = await client.post(endpoint, registrationData);
      }
    } catch (error) {
      console.error(`Error in POST request with registration data:`, error);
      throw error;
    }
  }
);

When(
  'I send POST request to {string} with login data',
  async function (endpoint) {
    try {
      if (endpoint === '/login') {
        response = await authService.login(loginData);
      } else {
        const client = authService.apiClient;
        response = await client.post(endpoint, loginData);
      }
    } catch (error) {
      console.error(`Error in POST request with login data:`, error);
      throw error;
    }
  }
);

When(
  'I send PUT request to {string} with user data',
  async function (endpoint) {
    try {
      if (endpoint.startsWith('/users/')) {
        const id = endpoint.split('/')[2];
        response = await userService.updateUserWithPut(id, userData);
      } else {
        const client = userService.apiClient;
        response = await client.put(endpoint, userData);
      }
    } catch (error) {
      console.error(`Error in PUT request to ${endpoint}:`, error);
      throw error;
    }
  }
);

When(
  'I send PATCH request to {string} with user data',
  async function (endpoint) {
    try {
      if (endpoint.startsWith('/users/')) {
        const id = endpoint.split('/')[2];
        response = await userService.updateUserWithPatch(id, userData);
      } else {
        const client = userService.apiClient;
        response = await client.patch(endpoint, userData);
      }
    } catch (error) {
      console.error(`Error in PATCH request to ${endpoint}:`, error);
      throw error;
    }
  }
);

When('I send DELETE request to {string}', async function (endpoint) {
  try {
    if (endpoint.startsWith('/users/')) {
      const id = endpoint.split('/')[2];
      response = await userService.deleteUser(id);
    } else {
      const client = userService.apiClient;
      response = await client.delete(endpoint);
    }
  } catch (error) {
    console.error(`Error in DELETE request to ${endpoint}:`, error);
    throw error;
  }
});

// Status code assertions
Then('the response status code should be {int}', function (expectedStatusCode) {
  assert.strictEqual(response.status, expectedStatusCode);
});

// Response property assertions
Then('the response should contain {string} property', function (property) {
  assert.ok(
    Object.prototype.hasOwnProperty.call(response.data, property),
    `Expected response to have property "${property}" but it doesn't.`
  );
});
