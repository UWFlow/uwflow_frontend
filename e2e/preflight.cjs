const { course } = require('./backend.cjs');
const settings = require('./settings.cjs');
const fs = require('fs');
const path = require('path');

async function preflight() {
  if (!fs.existsSync(path.join(settings.root, 'build/index.html')))
    throw new Error('Frontend build missing. Run bun run e2e:build first.');
  const selected = await course();
  // No account is created by this check; invalid credentials must reach auth.
  const response = await fetch(`${settings.apiURL}/auth/email/login`, {
    method: 'POST',
    redirect: 'error',
    signal: AbortSignal.timeout(10000),
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({}),
  });
  if (response.status !== 400)
    throw new Error(
      `API login preflight expected HTTP 400, got ${response.status}`,
    );
  console.log(
    `E2E ready: ${settings.baseURL}, course ${selected.code} (${selected.name}).`,
  );
}

module.exports = preflight;
if (require.main === module)
  preflight().catch((error) => {
    console.error(
      `E2E preflight failed: ${error.message}\nStart the local Go API + Hasura + Postgres using the backend README. See e2e/README.md for configuration.`,
    );
    process.exitCode = 1;
  });
