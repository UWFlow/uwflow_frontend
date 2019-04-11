export const BROWSER_WINDOW_RESIZED = 'BROWSER_WINDOW_RESIZED';

export function BrowserWindowResized(width, height) {
  return {
    type: BROWSER_WINDOW_RESIZED,
    payload: {
      width,
      height,
    },
  };
}
