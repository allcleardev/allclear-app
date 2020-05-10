const createAccount = require('./tests/create-account.js');
const home = require('./tests/home.js');

describe('Functional Workflow Tests', () => {
  test('Account Creation Workflow', async () => {
    await createAccount.test();
  }, 25000);

  test('Home Page Workflow', async () => {
    await home.test();
  }, 25000);
});
