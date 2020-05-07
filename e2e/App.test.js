const createAccount = require('./tests/create-account.js');

describe('Functional Workflow Tests', () => {
  test('Account Creation Workflow', async() => {
    await createAccount.test();
  }, 20000);
});