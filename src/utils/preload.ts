// Helpers for warming a route's lazy `@loadable/component` chunk before the user
// commits to navigating. Over the network (staging/prod) the chunk fetch adds a
// visible 1-2s gap between click and the page mounting; preloading on hover/focus
// kicks off that fetch early so the chunk is usually ready by click time.

// Any `@loadable/component` exposes a no-arg-callable `preload()`.
type Preloadable = { preload: () => void };

// Spread onto a link/button to preload its destination chunk on pointer/keyboard
// intent, e.g. `<Link {...preloadProps(LoadableCoursePage)} />`.
export const preloadProps = (loadable: Preloadable) => ({
  onMouseEnter: () => loadable.preload(),
  onFocus: () => loadable.preload(),
});
