export const HISTORY_FORWARD = 'HISTORY_FORWARD';
export const HISTORY_BACK = 'HISTORY_BACK';

export const NATIVE_HISTORY_POP = 'POP';
export const NATIVE_HISTORY_PUSH = 'PUSH';

export const historyForward = (url) => ({
  type: HISTORY_FORWARD,
  payload: url,
});

export const historyBack = () => ({
  type: HISTORY_BACK,
});