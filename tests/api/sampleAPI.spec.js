import axios from 'axios';
import { expect } from 'chai';
import config from '../../selenium.config.js';

describe('Sample API Test', function() {
  it('should make a GET request to the API', async function() {
    const response = await axios.get(`${config.baseUrls.api}/api/users/2`);
    expect(response.status).to.equal(200);
    expect(response.data.data).to.have.property('id', 2);
  });
});

