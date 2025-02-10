(async () => {
    try {
        const url = 'https://reqres.in/api/users';
        const payload = {
            name: 'John Doe',
            job: 'Software Developer'
        };

        // Send the POST request using fetch
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        // Check if the response was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        const responseData = await response.json();
        console.log('Response:', responseData);
    } catch (error) {
        console.error('Error during POST request:', error);
    }
})();
