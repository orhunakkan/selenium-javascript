// This file contains template data for API requests
// Values with placeholders will be replaced with faker data at runtime

export const apiFixtures = {
  createUser: {
    template: {
      name: '{{name}}',
      job: '{{job}}'
    }
  },
  registerUser: {
    successful: {
      email: 'eve.holt@reqres.in', // Keep this exact email as it's required by the API
      password: '{{password}}'
    },
    unsuccessful: {
      email: '{{email}}'
      // password intentionally missing
    }
  },
  loginUser: {
    successful: {
      email: 'eve.holt@reqres.in', // Keep this exact email as it's required by the API
      password: 'cityslicka' // Keep this exact password as it's required by the API
    },
    unsuccessful: {
      email: '{{email}}'
      // password intentionally missing
    }
  }
};
