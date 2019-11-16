export const REGISTER_TEXTBOX = 'REGISTER_TEXTBOX';
export const UNREGISTER_TEXTBOX = 'UNREGISTER_TEXTBOX';
export const SET_TEXTBOX_TEXT = 'SET_TEXTBOX_TEXT';

export const registerTextbox = (ID, placeholder) => ({
  type: REGISTER_TEXTBOX,
  payload: {
    ID,
    placeholder,
  },
});

export const unregisterTextbox = ID => ({
  type: UNREGISTER_TEXTBOX,
  payload: ID,
});

export const setTextboxText = (ID, text) => ({
  type: SET_TEXTBOX_TEXT,
  payload: {
    ID,
    text,
  },
});
