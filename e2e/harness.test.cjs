// These test the Node harness, not website behavior. No browser is launched.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const { spawnSync } = require('node:child_process');

test('configuration refuses a remote backend before making requests', () => {
  const result = spawnSync(
    process.execPath,
    ['-e', "require('./e2e/settings.cjs')"],
    {
      env: { ...process.env, E2E_API_URL: 'https://uwflow.com/api' },
      encoding: 'utf8',
    },
  );
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /must be an HTTP loopback URL/);
});

test('GraphQL errors and cleanup failures are surfaced; deletion is narrowly scoped', async (t) => {
  let handler;
  const server = http.createServer((req, res) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => handler(req, res, body ? JSON.parse(body) : undefined));
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const url = `http://127.0.0.1:${server.address().port}`;
  process.env.E2E_API_URL = url;
  process.env.E2E_GRAPHQL_URL = `${url}/graphql`;
  process.env.E2E_HASURA_ADMIN_SECRET = 'harness-only-secret';
  const backend = require('./backend.cjs');
  const account = {
    email: 'uwflow-e2e-11111111-1111-1111-1111-111111111111@example.invalid',
    password: 'harness-password',
  };

  await t.test(
    'HTTP 200 GraphQL errors cannot pass persistence assertions',
    async () => {
      handler = (_req, res) =>
        res.end(JSON.stringify({ errors: [{ message: 'permission denied' }] }));
      await assert.rejects(
        backend.reviews(42, 7, 'user-token'),
        /permission denied/,
      );
    },
  );

  await t.test(
    'cleanup refuses a personal account without contacting the API',
    async () => {
      handler = () => assert.fail('Unexpected request');
      await assert.rejects(
        backend.removeAccount({ email: 'person@example.com' }),
        /Refusing cleanup/,
      );
    },
  );

  await t.test('an account never registered needs no deletion', async () => {
    handler = (req, res) => {
      assert.equal(req.url, '/auth/email/login');
      res.writeHead(401);
      res.end(JSON.stringify({ error: 'email_not_registered' }));
    };
    await backend.removeAccount(account);
  });

  await t.test(
    'cleanup logs in as the generated account and verifies cascades',
    async () => {
      const seen = [];
      handler = (req, res, body) => {
        seen.push(req.url);
        if (req.url === '/auth/email/login') {
          assert.deepEqual(body, account);
          res.end(
            JSON.stringify({ user_id: 42, token: 'disposable-user-token' }),
          );
        } else if (req.url === '/user') {
          assert.equal(req.method, 'DELETE');
          assert.equal(
            req.headers.authorization,
            'Bearer disposable-user-token',
          );
          assert.equal(req.headers['x-hasura-admin-secret'], undefined);
          res.end();
        } else {
          assert.equal(req.url, '/graphql');
          assert.deepEqual(body.variables, { id: 42 });
          res.end(
            JSON.stringify({
              data: { user: [], review: [], user_course_taken: [] },
            }),
          );
        }
      };
      await backend.removeAccount(account);
      assert.deepEqual(seen, ['/auth/email/login', '/user', '/graphql']);
    },
  );

  await t.test(
    'a failed delete fails teardown instead of reporting clean success',
    async () => {
      handler = (req, res) => {
        if (req.url === '/auth/email/login')
          res.end(
            JSON.stringify({ user_id: 42, token: 'disposable-user-token' }),
          );
        else {
          res.writeHead(500);
          res.end();
        }
      };
      await assert.rejects(backend.removeAccount(account), /Cleanup failed/);
    },
  );
});
