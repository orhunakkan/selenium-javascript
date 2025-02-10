const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');

let userPayload;
let response;
let responseData;

Given('I have user details', function (dataTable) {
    const [userData] = dataTable.hashes();
    userPayload = userData;
});

When('I send POST request to create user', async function () {
    response = await fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userPayload)
    });
    responseData = await response.json();
});

Then('the response status code should be {int}', function (statusCode) {
    expect(response.status).to.equal(statusCode);
});

Then('the response should contain user details', function () {
    expect(responseData.name).to.equal(userPayload.name);
    expect(responseData.job).to.equal(userPayload.job);
    expect(responseData.id).to.exist;
    expect(responseData.createdAt).to.exist;
});