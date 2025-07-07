const environments = {
  dev: 'https://the-internet.herokuapp.com/',
  qa: 'https://the-internet.herokuapp.com/',
  uat: 'https://the-internet.herokuapp.com/',
  prod: 'https://the-internet.herokuapp.com/',
};

const currentEnv = process.env.ENV || 'dev';

if (process.env.ENV && !environments[currentEnv]) {
  console.error(`Invalid environment: '${currentEnv}'`);
  process.exit(1);
}

export const baseUrl = environments[currentEnv];
