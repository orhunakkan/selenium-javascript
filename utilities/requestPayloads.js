import { faker } from '@faker-js/faker';

/**
 * Generates a random pet payload for the Pet Store API
 * @returns {Object} A pet payload object
 */
export function generatePetPayload() {
    return {
        id: parseInt(String(Date.now()).slice(-10) + faker.number.int(9999)),
        category: {
            id: faker.number.int({ min: 1, max: 100 }),
            name: faker.animal.type()
        },
        name: faker.animal.dog(),
        photoUrls: [faker.image.url()],
        tags: [
            {
                id: faker.number.int({ min: 1, max: 50 }),
                name: faker.word.adjective()
            }
        ],
        status: faker.helpers.arrayElement(['available', 'pending', 'sold'])
    };
}

export function getHeaders() {
    return {
        headers: {
            'Content-Type': 'application/json'
        }
    };
}