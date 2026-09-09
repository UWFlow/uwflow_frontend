const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const root = path.resolve(__dirname, '..');
dotenv.config({ path: path.join(root, '.env.e2e.local') });

function localURL(value, name) {
  const url = new URL(value);
  if (
    url.protocol !== 'http:' ||
    !['localhost', '127.0.0.1'].includes(url.hostname) ||
    url.username ||
    url.password
  ) {
    throw new Error(
      `${name} must be an HTTP loopback URL. E2E creates and deletes test accounts.`,
    );
  }
  return url.href.replace(/\/$/, '');
}

const settings = {
  root,
  baseURL: 'http://localhost:3100',
  apiURL: localURL(
    process.env.E2E_API_URL || 'http://127.0.0.1:8081',
    'E2E_API_URL',
  ),
  graphqlURL: localURL(
    process.env.E2E_GRAPHQL_URL || 'http://127.0.0.1:8080/v1/graphql',
    'E2E_GRAPHQL_URL',
  ),
  courseCode: process.env.E2E_COURSE_CODE || 'cs135',
};

// Read only the admin secret, never export backend environment into the build.
function adminSecret() {
  if (process.env.E2E_HASURA_ADMIN_SECRET)
    return process.env.E2E_HASURA_ADMIN_SECRET;
  const envPath = path.resolve(
    root,
    process.env.E2E_BACKEND_ENV || '../uwflow/.env',
  );
  const env = fs.existsSync(envPath)
    ? dotenv.parse(fs.readFileSync(envPath))
    : {};
  if (!env.HASURA_GRAPHQL_ADMIN_SECRET) {
    throw new Error(
      'Set E2E_HASURA_ADMIN_SECRET or E2E_BACKEND_ENV in .env.e2e.local (see e2e/README.md).',
    );
  }
  return env.HASURA_GRAPHQL_ADMIN_SECRET;
}

module.exports = { ...settings, adminSecret };
