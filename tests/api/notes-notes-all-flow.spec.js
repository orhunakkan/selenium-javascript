import axios from 'axios';
import { expect } from 'chai';
import dotenv from 'dotenv';

dotenv.config();

describe('Notes Notes API Flow', () => {
  const registerUrl = `${process.env.API_URL}/users/register`;
  const loginUrl = `${process.env.API_URL}/users/login`;
  const notesUrl = `${process.env.API_URL}/notes`;

  let registeredUser = {};
  let authToken = '';
  let createdNoteId = '';

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
    expect(response.data.data).to.have.property('id');
    expect(typeof response.data.data.id).to.equal('string');
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
    expect(response.data.data).to.have.property('id');
    expect(typeof response.data.data.id).to.equal('string');
    expect(response.data.data).to.have.property('name', registeredUser.name);
    expect(response.data.data).to.have.property('email', registeredUser.email);
    expect(response.data.data).to.have.property('token');
    expect(typeof response.data.data.token).to.equal('string');

    authToken = response.data.data.token;
  });

  it('should create a note with title, description, and category using auth token', async () => {
    const notePayload = {
      title: 'Home Note Title',
      description: 'Home API note description',
      category: 'Home',
    };

    const response = await axios.post(notesUrl, notePayload, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': authToken,
      },
    });

    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('success', true);
    expect(response.data).to.have.property('message', 'Note successfully created');
    expect(response.data).to.have.property('data');
    expect(response.data.data).to.have.property('id');
    expect(typeof response.data.data.id).to.equal('string');
    expect(response.data.data).to.have.property('title', notePayload.title);
    expect(response.data.data).to.have.property('description', notePayload.description);
    expect(response.data.data).to.have.property('category', notePayload.category);
    expect(response.data.data).to.have.property('completed', false);
    expect(response.data.data).to.have.property('created_at');
    expect(typeof response.data.data.created_at).to.equal('string');
    expect(response.data.data).to.have.property('updated_at');
    expect(typeof response.data.data.updated_at).to.equal('string');
    expect(response.data.data).to.have.property('user_id');
    expect(typeof response.data.data.user_id).to.equal('string');

    createdNoteId = response.data.data.id;
  });

  it('should create a note with title, description, and category using auth token', async () => {
    const notePayload = {
      title: 'Work Note Title',
      description: 'Work API note description',
      category: 'Work',
    };

    const response = await axios.post(notesUrl, notePayload, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': authToken,
      },
    });

    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('success', true);
    expect(response.data).to.have.property('message', 'Note successfully created');
    expect(response.data).to.have.property('data');
    expect(response.data.data).to.have.property('id');
    expect(typeof response.data.data.id).to.equal('string');
    expect(response.data.data).to.have.property('title', notePayload.title);
    expect(response.data.data).to.have.property('description', notePayload.description);
    expect(response.data.data).to.have.property('category', notePayload.category);
    expect(response.data.data).to.have.property('completed', false);
    expect(response.data.data).to.have.property('created_at');
    expect(typeof response.data.data.created_at).to.equal('string');
    expect(response.data.data).to.have.property('updated_at');
    expect(typeof response.data.data.updated_at).to.equal('string');
    expect(response.data.data).to.have.property('user_id');
    expect(typeof response.data.data.user_id).to.equal('string');
  });

  it('should retrieve note by ID with auth token', async () => {
    const response = await axios.get(`${notesUrl}/${createdNoteId}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': authToken,
      },
    });

    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('success', true);
    expect(response.data).to.have.property('message', 'Note successfully retrieved');
    expect(response.data).to.have.property('data');
    expect(response.data.data).to.have.property('id', createdNoteId);
    expect(response.data.data).to.have.property('title', 'Home Note Title');
    expect(response.data.data).to.have.property('description', 'Home API note description');
    expect(response.data.data).to.have.property('category', 'Home');
    expect(response.data.data).to.have.property('completed', false);
    expect(response.data.data).to.have.property('created_at');
    expect(typeof response.data.data.created_at).to.equal('string');
    expect(response.data.data).to.have.property('updated_at');
    expect(typeof response.data.data.updated_at).to.equal('string');
    expect(response.data.data).to.have.property('user_id');
    expect(typeof response.data.data.user_id).to.equal('string');
  });

  it('should update note by ID with auth token', async () => {
    const updatePayload = {
      title: 'Updated Home Note Title',
      description: 'Updated Home API note description',
      completed: true,
      category: 'Personal',
    };

    const response = await axios.put(`${notesUrl}/${createdNoteId}`, updatePayload, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': authToken,
      },
    });

    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('success', true);
    expect(response.data).to.have.property('message', 'Note successfully Updated');
    expect(response.data).to.have.property('data');
    expect(response.data.data).to.have.property('id', createdNoteId);
    expect(response.data.data).to.have.property('title', updatePayload.title);
    expect(response.data.data).to.have.property('description', updatePayload.description);
    expect(response.data.data).to.have.property('category', updatePayload.category);
    expect(response.data.data).to.have.property('completed', updatePayload.completed);
    expect(response.data.data).to.have.property('created_at');
    expect(typeof response.data.data.created_at).to.equal('string');
    expect(response.data.data).to.have.property('updated_at');
    expect(typeof response.data.data.updated_at).to.equal('string');
    expect(response.data.data).to.have.property('user_id');
    expect(typeof response.data.data.user_id).to.equal('string');
  });

  it('should retrieve all notes with auth token', async () => {
    const response = await axios.get(notesUrl, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': authToken,
      },
    });

    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('success', true);
    expect(response.data).to.have.property('message', 'Notes successfully retrieved');
    expect(response.data).to.have.property('data');
    expect(Array.isArray(response.data.data)).to.be.true;
    expect(response.data.data).to.have.lengthOf(2);

    const notes = response.data.data;

    const personalNote = notes.find((note) => note.category === 'Personal');
    expect(personalNote).to.exist;
    expect(personalNote).to.have.property('id');
    expect(typeof personalNote.id).to.equal('string');
    expect(personalNote).to.have.property('title', 'Updated Home Note Title');
    expect(personalNote).to.have.property('description', 'Updated Home API note description');
    expect(personalNote).to.have.property('completed', true);
    expect(personalNote).to.have.property('created_at');
    expect(typeof personalNote.created_at).to.equal('string');
    expect(personalNote).to.have.property('updated_at');
    expect(typeof personalNote.updated_at).to.equal('string');
    expect(personalNote).to.have.property('user_id');
    expect(typeof personalNote.user_id).to.equal('string');

    const workNote = notes.find((note) => note.category === 'Work');
    expect(workNote).to.exist;
    expect(workNote).to.have.property('id');
    expect(typeof workNote.id).to.equal('string');
    expect(workNote).to.have.property('title', 'Work Note Title');
    expect(workNote).to.have.property('description', 'Work API note description');
    expect(workNote).to.have.property('completed', false);
    expect(workNote).to.have.property('created_at');
    expect(typeof workNote.created_at).to.equal('string');
    expect(workNote).to.have.property('updated_at');
    expect(typeof workNote.updated_at).to.equal('string');
    expect(workNote).to.have.property('user_id');
    expect(typeof workNote.user_id).to.equal('string');
  });

  it('should delete note by ID with auth token', async () => {
    const response = await axios.delete(`${notesUrl}/${createdNoteId}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': authToken,
      },
    });

    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('success', true);
    expect(response.data).to.have.property('message', 'Note successfully deleted');
  });
});
