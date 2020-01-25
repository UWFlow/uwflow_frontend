import { getDataState } from './DataReducer';

import {
  REGISTER_TEXTBOX,
  UNREGISTER_TEXTBOX,
  SET_TEXTBOX_TEXT,
} from '../actions/TextboxActions';

export default (
  state = {
    IDMapping: {},
  },
  action,
) => {
  switch (action.type) {
    case REGISTER_TEXTBOX:
      if (state.IDMapping[action.payload.ID]) {
        return state;
      }
      return {
        ...state,
        IDMapping: {
          ...state.IDMapping,
          [action.payload.ID]: {
            text: '',
            placeholder: action.payload.placeholder,
          },
        },
      };
    case UNREGISTER_TEXTBOX:
      let IDMapping = {
        ...state.IDMapping,
      };
      delete IDMapping[action.payload];
      return {
        ...state,
        IDMapping,
      };
    case SET_TEXTBOX_TEXT:
      return {
        ...state,
        IDMapping: {
          ...state.IDMapping,
          [action.payload.ID]: {
            ...state.IDMapping[action.payload.ID],
            text: action.payload.text,
          },
        },
      };
    default:
      break;
  }
  return state;
};

export const getTextboxState = state => {
  return getDataState(state).textbox;
};

export const getTextboxIDMapping = state => {
  return getTextboxState(state).IDMapping;
};

export const getTextbox = (state, ID) => {
  return getTextboxIDMapping(state)[ID];
};

export const getTextboxText = (state, ID) => {
  const textbox = getTextbox(state, ID);
  return textbox && textbox.text;
};

export const getTextboxPlaceholder = (state, ID) => {
  const textbox = getTextbox(state, ID);
  return textbox && textbox.placeholder;
};
