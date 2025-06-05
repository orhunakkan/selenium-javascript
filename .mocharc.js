export const spec = ['tests/**/*.spec.js'];
export const timeout = 30000;
export const grep = process.env.TEST_TAG ? new RegExp(process.env.TEST_TAG) : undefined;
