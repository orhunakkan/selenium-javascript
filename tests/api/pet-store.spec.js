import axios from 'axios';
import { describe } from 'mocha';
import { expect } from 'chai';

describe('Pet Store API Tests', () => {

    it('should create a new pet', async () => {
        const pet = {
            "id": 5,
            "category": {
                "id": 5,
                "name": "string"
            },
            "name": "doggie",
            "photoUrls": [
                "string"
            ],
            "tags": [
                {
                    "id": 5,
                    "name": "string"
                }
            ],
            "status": "available"
        };

        const response = await axios.post('https://petstore.swagger.io/v2/pet', pet, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        expect(response.status).to.equal(200);
        expect(response.data.name).to.equal('doggie');
        expect(response.data.status).to.equal('available');
    });

    it('should retrieve the created pet', async () => {
        const response = await axios.get('https://petstore.swagger.io/v2/pet/5');
        expect(response.status).to.equal(200);
        expect(response.data.id).to.equal(5);
        expect(response.data.name).to.equal('doggie');
        expect(response.data.status).to.equal('available');
    });
});