import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

const src = (dir: string) => path.resolve(__dirname, `src/${dir}`);

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic',
      // Web workers have no `window`; exclude them so the React Refresh
      // preamble (which references window) is not injected into worker bundles.
      exclude: /\.worker\.[tj]sx?$/,
    }),
    // @vitejs/plugin-react's refresh-runtime.js references `window` at module
    // scope with no guard. When bundled into the search worker IIFE, `window`
    // is undefined. Prepend a shim so it resolves to globalThis instead.
    {
      name: 'worker-safe-react-refresh',
      enforce: 'post',
      transform(code: string, id: string) {
        if (!id.includes('refresh-runtime.js')) return undefined;
        return `const window = typeof globalThis.window !== "undefined" ? globalThis.window : globalThis;\n${code}`;
      },
    },
  ],
  resolve: {
    // Vite's default puts .mjs first, but graphql-tag's src/index.js uses CJS
    // require() and accidentally loads graphql/language/parser.mjs (ESM) instead
    // of parser.js (CJS), breaking esbuild's CJS/ESM interop at runtime.
    // Putting .js before .mjs restores correct CJS resolution.
    extensions: ['.ts', '.tsx', '.mts', '.js', '.mjs', '.jsx', '.json'],
    alias: [
      // 'graphql' would conflict with the npm 'graphql' package, so we match
      // only our internal subpaths (queries, mutations, fragments, apollo.js).
      // Bare `import 'graphql'` and npm subpaths like graphql/language/* are
      // intentionally left unmatched so Vite falls through to node_modules.
      {
        find: /^graphql\/(queries|mutations|fragments|apollo\.js)(.*)/,
        replacement: `${src('graphql')}/$1$2`,
      },
      // shadcn/ui convention: @/foo → src/foo
      { find: '@/', replacement: `${src('')}/` },
      { find: 'App', replacement: src('App') },
      { find: 'browserhistory', replacement: src('browserhistory') },
      { find: 'components', replacement: src('components') },
      { find: 'constants', replacement: src('constants') },
      { find: 'data', replacement: src('data') },
      { find: 'generated', replacement: src('generated') },
      { find: 'hooks', replacement: src('hooks') },
      { find: 'img', replacement: src('img') },
      { find: 'LoadableComponents', replacement: src('LoadableComponents') },
      { find: 'pages', replacement: src('pages') },
      { find: 'Routes', replacement: src('Routes') },
      { find: 'search', replacement: src('search') },
      { find: 'Store', replacement: src('Store') },
      { find: 'types', replacement: src('types') },
      { find: 'utils', replacement: src('utils') },
    ],
  },
  build: {
    outDir: 'build',
    sourcemap: true,
  },
  server: {
    port: 3001,
  },
});
