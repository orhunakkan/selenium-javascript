const axios = require("axios");

class APIHelper {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL: baseURL,
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async get(endpoint) {
    try {
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(`GET request failed: ${error.message}`);
    }
  }

  // Add other methods (POST, PUT, DELETE)
}

module.exports = APIHelper;
