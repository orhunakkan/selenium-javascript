import axios from 'axios';
import { describe } from 'mocha';
import { expect } from 'chai';

// Create a Pet and verify it exists
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

        try {
            const response = await axios.post('https://petstore.swagger.io/v2/pet', pet, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            expect(response.status).to.equal(200); // Petstore API returns 200 for successful POST
            expect(response.data.name).to.equal('doggie');
            expect(response.data.status).to.equal('available');
        } catch (error) {
            console.error('API Error:', error.response ? error.response.data : error.message);
            throw error;
        }
    });

    // Verify the Pet exists
    it('should retrieve the created pet', async () => {
        try {
            const response = await axios.get('https://petstore.swagger.io/v2/pet/5');
            expect(response.status).to.equal(200);
            expect(response.data.id).to.equal(5);
            expect(response.data.name).to.equal('doggie');
            expect(response.data.status).to.equal('available'); // Status may vary based on the API state
        } catch (error) {
            console.error('API Error:', error.response ? error.response.data : error.message);
            throw error;
        }
    }); 
});