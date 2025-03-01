import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'node:assert/strict';
import axios from 'axios';

// Setup axios client
const baseUrl = 'https://reqres.in/api';
const client = axios.create({
  baseURL: baseUrl,
  validateStatus: null // Allow all status codes
});

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

// HTTP methods
When('I send GET request to {string}', async function (endpoint) {
  try {
    response = await client.get(endpoint);
    console.log(`GET ${endpoint} response status: ${response.status}`);
  } catch (error) {
    console.error(`Error in GET request to ${endpoint}:`, error);
    throw error;
  }
});

When(
  'I send POST request to {string} with user data',
  async function (endpoint) {
    try {
      response = await client.post(endpoint, userData);
      console.log(
        `POST ${endpoint} with user data response status: ${response.status}`
      );
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
      response = await client.post(endpoint, registrationData);
      console.log(
        `POST ${endpoint} with registration data response status: ${response.status}`
      );
    } catch (error) {
      console.error(
        `Error in POST request to ${endpoint} with registration data:`,
        error
      );
      throw error;
    }
  }
);

When(
  'I send POST request to {string} with login data',
  async function (endpoint) {
    try {
      response = await client.post(endpoint, loginData);
      console.log(
        `POST ${endpoint} with login data response status: ${response.status}`
      );
    } catch (error) {
      console.error(
        `Error in POST request to ${endpoint} with login data:`,
        error
      );
      throw error;
    }
  }
);

When(
  'I send PUT request to {string} with user data',
  async function (endpoint) {
    try {
      response = await client.put(endpoint, userData);
      console.log(`PUT ${endpoint} response status: ${response.status}`);
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
      response = await client.patch(endpoint, userData);
      console.log(`PATCH ${endpoint} response status: ${response.status}`);
    } catch (error) {
      console.error(`Error in PATCH request to ${endpoint}:`, error);
      throw error;
    }
  }
);

When('I send DELETE request to {string}', async function (endpoint) {
  try {
    response = await client.delete(endpoint);
    console.log(`DELETE ${endpoint} response status: ${response.status}`);
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

// Additional assertions specific to scenarios
Then('I should see a list of users', function () {
  assert.ok(Array.isArray(response.data.data));
  assert.ok(response.data.data.length > 0);
});

Then('I should see user details', function () {
  assert.ok(Object.prototype.hasOwnProperty.call(response.data.data, 'id'));
  assert.ok(Object.prototype.hasOwnProperty.call(response.data.data, 'email'));
});

Then('I should see the newly created user details', function () {
  assert.strictEqual(response.data.name, userData.name);
  assert.strictEqual(response.data.job, userData.job);
  assert.ok(Object.prototype.hasOwnProperty.call(response.data, 'id'));
  assert.ok(Object.prototype.hasOwnProperty.call(response.data, 'createdAt'));
});

Then('I should see the updated user details', function () {
  assert.strictEqual(response.data.name, userData.name);
  assert.strictEqual(response.data.job, userData.job);
  assert.ok(Object.prototype.hasOwnProperty.call(response.data, 'updatedAt'));
});

Then('I should see a list of resources', function () {
  assert.ok(Array.isArray(response.data.data));
  assert.ok(response.data.data.length > 0);
});

Then('I should see resource details', function () {
  assert.ok(Object.prototype.hasOwnProperty.call(response.data.data, 'id'));
  assert.ok(Object.prototype.hasOwnProperty.call(response.data.data, 'name'));
});

Then('I should see the registration token and ID', function () {
  assert.ok(Object.prototype.hasOwnProperty.call(response.data, 'token'));
  assert.ok(Object.prototype.hasOwnProperty.call(response.data, 'id'));
});

Then('I should see the login token', function () {
  assert.ok(Object.prototype.hasOwnProperty.call(response.data, 'token'));
});

Then('I should see an error message', function () {
  assert.ok(Object.prototype.hasOwnProperty.call(response.data, 'error'));
});
