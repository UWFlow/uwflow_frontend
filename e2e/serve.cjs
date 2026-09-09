const http = require('http');
const fs = require('fs');
const path = require('path');
const settings = require('./settings.cjs');
const build = path.join(settings.root, 'build');
const mime = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

// Same-origin proxies exercise the production /api and /graphql routing contract.
// No admin headers are injected here; browsers only receive their own user JWT.
const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, settings.baseURL).pathname;
  if (pathname === '/graphql' || pathname.startsWith('/api/')) {
    const target =
      pathname === '/graphql'
        ? new URL(settings.graphqlURL)
        : new URL(settings.apiURL + req.url.slice(4));
    const upstream = http.request(
      target,
      { method: req.method, headers: { ...req.headers, host: target.host } },
      (response) => {
        res.writeHead(response.statusCode, response.headers);
        response.pipe(res);
      },
    );
    upstream.setTimeout(15000, () =>
      upstream.destroy(new Error('Backend timeout')),
    );
    upstream.on('error', () => {
      res.writeHead(502);
      res.end('Local E2E backend unavailable');
    });
    req.pipe(upstream);
    return;
  }
  let file = path.resolve(build, `.${pathname}`);
  if (!file.startsWith(build + path.sep)) file = path.join(build, 'index.html');
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory())
    file = path.join(build, 'index.html');
  if (!fs.existsSync(file)) {
    res.writeHead(503);
    res.end('Run bun run e2e:build');
    return;
  }
  res.writeHead(200, {
    'content-type': mime[path.extname(file)] || 'application/octet-stream',
    'cache-control': 'no-store',
  });
  fs.createReadStream(file).pipe(res);
});
server.listen(3100, 'localhost', () =>
  console.log(`E2E frontend: ${settings.baseURL}`),
);
