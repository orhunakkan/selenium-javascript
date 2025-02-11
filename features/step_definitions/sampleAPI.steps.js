import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'node:assert/strict';
import { APIClient } from '../../utilities/sampleUtility.js';

const apiClient = new APIClient();
let userPayload;
let response;

Given('I have user details', function (dataTable) {
  const [userData] = dataTable.hashes();
  userPayload = userData;
});

When('I send POST request to create user', async function () {
  response = await apiClient.createUser(userPayload);
});

Then('the response status code should be {int}', function (statusCode) {
  assert.equal(response.status, statusCode);
});

Then('the response should contain user details', function () {
  assert.equal(response.data.name, userPayload.name);
  assert.equal(response.data.job, userPayload.job);
  assert.ok(response.data.id);
  assert.ok(response.data.createdAt);
});
