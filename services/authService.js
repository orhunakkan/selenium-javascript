import { APIClient } from '../utilities/apiClient.js';

export class AuthService {
  constructor(baseURL = 'https://reqres.in/api') {
    this.apiClient = new APIClient(baseURL);
  }

  async register(registrationData) {
    return await this.apiClient.post('/register', registrationData);
  }

  async login(loginData) {
    return await this.apiClient.post('/login', loginData);
  }
}
