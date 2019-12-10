/* Actions */
import { HISTORY_FORWARD, HISTORY_BACK } from '../actions/HistoryActions';

const DEFAULT_STATE = { histories: [] };

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case HISTORY_FORWARD:
      return {
        ...state,
        histories: [...state.histories, action.payload],
      };
    case HISTORY_BACK:
      const newHistories = state.histories.slice(0, -1);
      return {
        ...state,
        histories: newHistories,
      };
    default:
      break;
  }
  return state;
};
