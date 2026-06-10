// Key used to remember that we already attempted a recovery reload for a failed
// chunk load. Scoped to the tab (sessionStorage) so it resets on a new session.
const RELOAD_FLAG = 'chunkReloadAttempted';

/**
 * Wraps a dynamic `import()` so a chunk-load failure recovers automatically.
 *
 * After a deploy, webpack chunk filenames get new content hashes and the old
 * files are removed. A browser that loaded the site *before* the deploy still
 * references the old hashes; when it lazily imports a page, the request 404s (or,
 * behind an SPA fallback, returns index.html — which the browser then fails to
 * parse as JS with "Unexpected token '<'"). Either way the `import()` promise
 * rejects.
 *
 * On the first such failure we do a single full-page reload, which fetches a
 * fresh index.html pointing at the current chunk hashes and recovers the user.
 * A sessionStorage flag prevents an infinite reload loop: if the import still
 * fails after one reload, the error is rethrown so an error boundary can show a
 * fallback instead of reloading forever.
 */
export const lazyRetry =
  <T>(importFactory: () => Promise<T>): (() => Promise<T>) =>
  () =>
    importFactory().then(
      (loadedModule) => {
        // Loaded successfully — clear the flag so a future stale-chunk failure
        // (e.g. after the next deploy) is allowed to reload again.
        window.sessionStorage.removeItem(RELOAD_FLAG);
        return loadedModule;
      },
      (error) => {
        const alreadyReloaded =
          window.sessionStorage.getItem(RELOAD_FLAG) === 'true';

        if (!alreadyReloaded) {
          window.sessionStorage.setItem(RELOAD_FLAG, 'true');
          window.location.reload();
          // Return a never-settling promise so nothing renders (or throws)
          // before the reload takes effect.
          return new Promise<T>(() => {});
        }

        // Reload already happened and it still fails — give up and let the
        // error boundary handle it.
        throw error;
      },
    );
