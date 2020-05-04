import { createBrowserHistory, History } from 'history';
import { Store } from 'redux';

/* Actions */
import {
  NATIVE_HISTORY_POP,
  NATIVE_HISTORY_PUSH,
  historyBack,
  historyForward,
} from '../data/actions/HistoryActions';

// Export a function, when called creates a history object
export default (): History<History.PoorMansUnknown> => {
  const history = createBrowserHistory();

  // clear the initial state
  delete history.location.state;

  return history;
};

export const syncReduxHistory = (
  store: Store,
  history: History<History.PoorMansUnknown>,
): void => {
  history.listen((location, action) => {
    if (action === NATIVE_HISTORY_POP) {
      store.dispatch(historyBack());
    } else if (action === NATIVE_HISTORY_PUSH) {
      const { pathname, search } = location;
      const nextUrl = search ? `${pathname}?${search}` : pathname;
      store.dispatch(historyForward(nextUrl));
    }
  });
};
