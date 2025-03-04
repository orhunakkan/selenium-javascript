import { faker } from '@faker-js/faker';
import { cloneDeep } from '../utilities/object-utils';

/**
 * Replaces placeholder values in an object with generated faker data
 * @param {Object} template - The template object containing placeholders
 * @returns {Object} - Object with placeholders replaced with faker data
 */
export function populateWithFakerData(template) {
  const data = cloneDeep(template);

  const populateObject = obj => {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        populateObject(obj[key]);
      } else if (typeof obj[key] === 'string' && obj[key].startsWith('{{') && obj[key].endsWith('}}')) {
        const fakerPath = obj[key].slice(2, -2); // Remove {{ and }}
        obj[key] = generateFakerValue(fakerPath);
      }
    }
    return obj;
  };

  return populateObject(data);
}

/**
 * Generates a faker value based on the provided path/key
 * @param {string} path - The faker path or custom key
 * @returns {any} - Generated value
 */
function generateFakerValue(path) {
  switch (path) {
    case 'name':
      return faker.person.fullName();
    case 'job':
      return faker.person.jobTitle();
    case 'email':
      return faker.internet.email();
    case 'password':
      return faker.internet.password({ length: 10, memorable: true });
    default:
      return `Unknown placeholder: ${path}`;
  }
}
