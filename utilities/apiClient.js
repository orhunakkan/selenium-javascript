import axios from 'axios';

export class APIClient {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL: baseURL,
      validateStatus: null // Allow all status codes
    });
  }

  async get(endpoint) {
    try {
      const response = await this.client.get(endpoint);
      console.log(`GET ${endpoint} response status: ${response.status}`);
      return response;
    } catch (error) {
      console.error(`Error in GET request to ${endpoint}:`, error);
      throw error;
    }
  }

  async post(endpoint, data) {
    try {
      const response = await this.client.post(endpoint, data);
      console.log(`POST ${endpoint} response status: ${response.status}`);
      return response;
    } catch (error) {
      console.error(`Error in POST request to ${endpoint}:`, error);
      throw error;
    }
  }

  async put(endpoint, data) {
    try {
      const response = await this.client.put(endpoint, data);
      console.log(`PUT ${endpoint} response status: ${response.status}`);
      return response;
    } catch (error) {
      console.error(`Error in PUT request to ${endpoint}:`, error);
      throw error;
    }
  }

  async patch(endpoint, data) {
    try {
      const response = await this.client.patch(endpoint, data);
      console.log(`PATCH ${endpoint} response status: ${response.status}`);
      return response;
    } catch (error) {
      console.error(`Error in PATCH request to ${endpoint}:`, error);
      throw error;
    }
  }

  async delete(endpoint) {
    try {
      const response = await this.client.delete(endpoint);
      console.log(`DELETE ${endpoint} response status: ${response.status}`);
      return response;
    } catch (error) {
      console.error(`Error in DELETE request to ${endpoint}:`, error);
      throw error;
    }
  }
}
