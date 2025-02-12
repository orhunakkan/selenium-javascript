import { describe, it, expect } from 'vitest';
import { TestHelper } from '../../utilities/testHelper.js';

describe('User API Tests', () => {
  it('should create a new user', async () => {
    await TestHelper.retryTest(async () => {
      const url = 'https://reqres.in/api/users';
      const payload = {
        name: 'John Doe',
        job: 'Software Developer'
      };

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        expect(response.status).toBe(201);

        const responseData = await response.json();
        expect(responseData.name).toBe(payload.name);
        expect(responseData.job).toBe(payload.job);
        expect(responseData.id).toBeTruthy();
        expect(responseData.createdAt).toBeTruthy();
      } catch (error) {
        throw new Error(`API request failed: ${error.message}`);
      }
    }, 'create_user_api');
  });
});
