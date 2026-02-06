import axios from 'axios';
import { expect } from 'chai';
import dotenv from 'dotenv';

dotenv.config();

describe('Notes Users API Flow', () => {
  const registerUrl = `${process.env.API_URL}/users/register`;
  const loginUrl = `${process.env.API_URL}/users/login`;
  const profileUrl = `${process.env.API_URL}/users/profile`;
  const forgotPasswordUrl = `${process.env.API_URL}/users/forgot-password`;
  const logoutUrl = `${process.env.API_URL}/users/logout`;

  let registeredUser = {};
  let authToken = '';

  it('should register a new user successfully', async () => {
    const suffix = Date.now();
    const requestBody = {
      name: `testuser-${suffix}`,
      email: `testuser-${suffix}@example.com`,
      password: 'Test@1234',
    };

    registeredUser = requestBody;

    const response = await axios.post(registerUrl, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    expect(response.status).to.equal(201);
    expect(response.data).to.have.property('success', true);
    expect(response.data).to.have.property('status', 201);
    expect(response.data).to.have.property('message', 'User account created successfully');
    expect(response.data).to.have.property('data');
    expect(response.data.data).to.have.property('id').that.is.a('string');
    expect(response.data.data).to.have.property('name', requestBody.name);
    expect(response.data.data).to.have.property('email', requestBody.email);
  });

  it('should login with the registered user successfully', async () => {
    const loginBody = {
      email: registeredUser.email,
      password: registeredUser.password,
    };

    const response = await axios.post(loginUrl, loginBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('success', true);
    expect(response.data).to.have.property('status', 200);
    expect(response.data).to.have.property('message', 'Login successful');
    expect(response.data).to.have.property('data');
    expect(response.data.data).to.have.property('id').that.is.a('string');
    expect(response.data.data).to.have.property('name', registeredUser.name);
    expect(response.data.data).to.have.property('email', registeredUser.email);
    expect(response.data.data).to.have.property('token').that.is.a('string');

    authToken = response.data.data.token;
  });

  it('should get user profile with valid token', async () => {
    const response = await axios.get(profileUrl, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': authToken,
      },
    });

    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('success', true);
    expect(response.data).to.have.property('message', 'Profile successful');
    expect(response.data).to.have.property('data');
    expect(response.data.data).to.have.property('id').that.is.a('string');
    expect(response.data.data).to.have.property('name', registeredUser.name);
    expect(response.data.data).to.have.property('email', registeredUser.email);
  });

  it('should update the user profile with name, phone, and company', async () => {
    const updatedProfile = {
      name: `${registeredUser.name}-updated`,
      phone: '1234567890',
      company: 'Test Company',
    };

    const response = await axios.patch(profileUrl, updatedProfile, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': authToken,
      },
    });

    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('success', true);
    expect(response.data).to.have.property('status', 200);
    expect(response.data).to.have.property('message', 'Profile updated successful');
    expect(response.data).to.have.property('data');
    expect(response.data.data).to.have.property('id').that.is.a('string');
    expect(response.data.data).to.have.property('name', updatedProfile.name);
    expect(response.data.data).to.have.property('email', registeredUser.email);
    expect(response.data.data).to.have.property('phone', updatedProfile.phone);
    expect(response.data.data).to.have.property('company', updatedProfile.company);

    registeredUser = { ...registeredUser, ...updatedProfile };
  });

  it('should send forgot password email with valid email address', async () => {
    const forgotPasswordBody = {
      email: registeredUser.email,
    };

    const response = await axios.post(forgotPasswordUrl, forgotPasswordBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('success', true);
    expect(response.data).to.have.property('message');
    expect(response.data.message).to.include('Password reset link successfully sent to');
  });

  it('should logout with valid auth token', async () => {
    const response = await axios.delete(logoutUrl, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': authToken,
      },
    });

    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('success', true);
    expect(response.data).to.have.property('message', 'User has been successfully logged out');
  });
});
