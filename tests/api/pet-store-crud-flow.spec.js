import axios from 'axios';
import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import { generatePetPayload, getHeaders } from '../../utilities/requestPayloads.js';

describe('Pet Store API - Full CRUD Flow (Split Tests with Retry)', () => {

    const BASE_URL = 'https://petstore.swagger.io/v2';
    let pet;

    before(() => {
        pet = generatePetPayload();
    });

    it('should create a new pet', async () => {
        const response = await axios.post(`${BASE_URL}/pet`, pet, getHeaders());
        expect(response.status).to.equal(200);
        expect(response.data.id).to.equal(pet.id);
        expect(response.data.name).to.equal(pet.name);
        expect(response.data.status).to.equal(pet.status);
        expect(response.data.category).to.deep.equal(pet.category);
        expect(response.data.photoUrls).to.deep.equal(pet.photoUrls);
        expect(response.data.tags).to.deep.equal(pet.tags);
    });

    it('should retrieve the created pet', async () => {

        let retries = 5;
        let response;

        while (retries > 0) {
            try {
                response = await axios.get(`${BASE_URL}/pet/${pet.id}`);
                break; // successful response, exit retry loop
            } catch (error) {
                retries--;
                if (retries === 0) throw error;
                await new Promise(resolve => setTimeout(resolve, 500)); // small delay before retry
            }
        }

        expect(response.status).to.equal(200);
        expect(response.data.id).to.equal(pet.id);
        expect(response.data.name).to.equal(pet.name);
        expect(response.data.status).to.equal(pet.status);
        expect(response.data.category.id).to.equal(pet.category.id);
        expect(response.data.category.name).to.equal(pet.category.name);
        expect(response.data.photoUrls).to.deep.equal(pet.photoUrls);
        expect(response.data.tags.length).to.equal(pet.tags.length);
        expect(response.data.tags[0].id).to.equal(pet.tags[0].id);
        expect(response.data.tags[0].name).to.equal(pet.tags[0].name);
    });

    it('should update the pet', async () => {

        pet.name = 'UpdatedPetName';
        pet.status = 'sold';

        const response = await axios.put(`${BASE_URL}/pet`, pet, getHeaders());
        expect(response.status).to.equal(200);
        expect(response.data.name).to.equal(pet.name);
        expect(response.data.status).to.equal(pet.status);
    });

    it('should retrieve the updated pet', async () => {

        let retries = 5;
        let response;

        while (retries > 0) {
            try {
                response = await axios.get(`${BASE_URL}/pet/${pet.id}`);
                if (response.data.name === 'UpdatedPetName' && response.data.status === 'sold') {
                    break;
                }
                retries--;
                if (retries === 0) throw new Error('Updated data not found after retries');
                await new Promise(resolve => setTimeout(resolve, 500));
            } catch (error) {
                retries--;
                if (retries === 0) throw error;
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }

        expect(response.status).to.equal(200);
        expect(response.data.name).to.equal('UpdatedPetName');
        expect(response.data.status).to.equal('sold');
    });

    it('should delete the pet', async () => {
        const response = await axios.delete(`${BASE_URL}/pet/${pet.id}`);
        expect(response.status).to.equal(200);
    });

    it('should return 404 when retrieving deleted pet', async () => {

        let retries = 5;

        while (retries > 0) {
            try {
                await axios.get(`${BASE_URL}/pet/${pet.id}`);
                expect.fail('Expected 404 but got success');
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    return;
                }
                retries--;
                if (retries === 0) throw error;
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }
    });
});
