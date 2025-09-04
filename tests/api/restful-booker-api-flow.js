import axios from 'axios';
import {expect} from "chai";

let sessionToken;
const baseURL = 'https://restful-booker.herokuapp.com';

describe('restful-booker APIs', () => {
  it('should create token', async () => {
      const response = await axios.post(
        `${baseURL}/auth`,
        {
          'username' : 'admin',
          'password' : 'password123'
        },
      );
      expect(response.status).equal(200);
      sessionToken = response.data.token;
  });
  it('should get Booking Ids', async () => {
    const response = await axios.get(
      `${baseURL}/booking`,
    )
    expect(response.status).equal(200);
  });
})