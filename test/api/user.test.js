const { describe, it } = require("mocha");
const { expect } = require("chai");
const APIHelper = require("../../utils/apiHelper");
const AllureHelper = require("../../utils/allureHelper");

describe("JSONPlaceholder API Tests", function () {
  const api = new APIHelper("https://jsonplaceholder.typicode.com");

  it("should fetch users successfully", async function () {
    AllureHelper.addDescription("Test to verify users API endpoint");
    AllureHelper.addLabel("feature", "API");

    const users = await api.get("/users");

    expect(users).to.be.an("array");
    expect(users).to.have.lengthOf(10);
    expect(users[0]).to.have.property("name");
    expect(users[0]).to.have.property("email");
  });
});
