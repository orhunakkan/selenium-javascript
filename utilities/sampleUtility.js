import { Builder } from 'selenium-webdriver';

export class APIClient {
  constructor(baseURL = 'https://reqres.in/api') {
    this.baseURL = baseURL;
  }

  async createUser(payload) {
    const response = await fetch(`${this.baseURL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return {
      status: response.status,
      data: await response.json()
    };
  }
}

export class BrowserClient {
  static async build() {
    return new Builder().forBrowser('chrome').build();
  }
}
