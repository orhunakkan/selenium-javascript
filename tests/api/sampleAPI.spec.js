import { Assertions } from '../../utilities/sampleUtility.js';

(async () => {
    try {
        const url = 'https://reqres.in/api/users';
        const payload = {
            name: 'John Doe',
            job: 'Software Developer'
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        // Assert response status code is 201 (Created)
        Assertions.assertStatusCode(response, 201);

        const responseData = await response.json();
        
        // Assert response contains correct data
        Assertions.assertEquals(responseData.name, payload.name, 'Name in response does not match');
        Assertions.assertEquals(responseData.job, payload.job, 'Job in response does not match');
        Assertions.assertTrue(responseData.id, 'ID should be present in response');
        Assertions.assertTrue(responseData.createdAt, 'Creation timestamp should be present');

        console.log('Response:', responseData);
    } catch (error) {
        console.error('Error during POST request:', error);
    }
})();
