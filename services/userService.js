// services/userService.js
import { APIClient } from '../utilities/apiClient.js';

export class UserService {
  constructor(baseURL = 'https://reqres.in/api') {
    this.apiClient = new APIClient(baseURL);
  }

  async getUsers(page = 1) {
    return await this.apiClient.get(`/users?page=${page}`);
  }

  async getUserById(id) {
    return await this.apiClient.get(`/users/${id}`);
  }

  async createUser(userData) {
    return await this.apiClient.post('/users', userData);
  }

  async updateUserWithPut(id, userData) {
    return await this.apiClient.put(`/users/${id}`, userData);
  }

  async updateUserWithPatch(id, userData) {
    return await this.apiClient.patch(`/users/${id}`, userData);
  }

  async deleteUser(id) {
    return await this.apiClient.delete(`/users/${id}`);
  }

  async getResources() {
    return await this.apiClient.get('/unknown');
  }

  async getResourceById(id) {
    return await this.apiClient.get(`/unknown/${id}`);
  }

  async getUsersWithDelay(delay = 3) {
    return await this.apiClient.get(`/users?delay=${delay}`);
  }
}
