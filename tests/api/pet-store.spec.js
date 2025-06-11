import axios from 'axios';
import { describe } from 'mocha';
import { expect } from 'chai';
import { generatePetPayload, getHeaders } from '../../utilities/requestPayloads.js';

describe('Pet Store API Tests', () => {

    let createdPet;
    const BASE_URL = 'https://petstore.swagger.io/v2';

    it('should create a new pet with dynamic data', async () => {
        const pet = generatePetPayload();
        const headers = getHeaders();
        pet.status = 'available';

        const response = await axios.post(`${BASE_URL}/pet`, pet, headers);
        expect(response.status).to.equal(200);
        expect(response.data.name).to.equal(pet.name);
        expect(response.data.status).to.equal('available');
        expect(response.data.id).to.equal(pet.id);

        createdPet = response.data;
    });

    it('should retrieve the created pet', async () => {
        if (!createdPet) {
            this.skip();
        }

        let retriesLeft = 3;
        let response;

        while (retriesLeft > 0) {
            try {
                response = await axios.get(`${BASE_URL}/pet/${createdPet.id}`);
                break;
            } catch (error) {
                retriesLeft--;
                if (retriesLeft === 0) throw error;
            }
        }

        expect(response.status).to.equal(200);
        expect(response.data.id).to.equal(createdPet.id);
        expect(response.data.name).to.equal(createdPet.name);
        expect(response.data.status).to.equal(createdPet.status);
    });
});