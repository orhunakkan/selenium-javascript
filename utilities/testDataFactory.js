// utilities/testDataFactory.js
export class TestDataFactory {
  static getRegistrationData() {
    return {
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe123',
      email: 'john.doe@example.com',
      password: 'Password!123',
      phone: '571-000-0000',
      birthday: '01/01/1990',
      gender: 'Male',
      department: 'Department of Engineering',
      jobTitle: 'Developer',
      programmingLanguages: ['C++', 'Java', 'JavaScript']
    };
  }

  static getLoginData() {
    return {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    };
  }
}
