const { test: base, expect } = require('@playwright/test');
const { randomUUID } = require('crypto');
const backend = require('../backend.cjs');
const settings = require('../settings.cjs');

const test = base.extend({
  account: async ({}, use, testInfo) => {
    const account = {
      firstName: 'E2e',
      lastName: 'Reviewer',
      email: `uwflow-e2e-${randomUUID()}@example.invalid`,
      password: `E2e-${randomUUID()}!`,
    };
    await testInfo.attach('test-account', {
      body: JSON.stringify({ email: account.email }),
      contentType: 'application/json',
    });
    try {
      await use(account);
    } finally {
      await backend.removeAccount(account);
    }
  },
  registeredAccount: async ({ account }, use) => {
    const auth = await backend.register(account);
    await use({ ...account, ...auth });
  },
  course: async ({}, use) => {
    await use(await backend.course());
  },
  context: async ({ context }, use) => {
    // No email/password flow needs analytics, social SDKs, or remote images.
    // All application API/GraphQL traffic still reaches the real local backend.
    await context.route('**/*', (route) => {
      const url = new URL(route.request().url());
      return url.origin === settings.baseURL ? route.continue() : route.abort();
    });
    await use(context);
  },
});

module.exports = { test, expect };
