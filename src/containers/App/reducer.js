import { produce } from 'immer';

import {
  SET_LOCAL,
  SET_THEME,
  SET_POPUP,
  SET_LOADING,
  SET_DATA,
  ADD_TODO,
  DELETE_TODO,
  SET_TODO,
  DELETE_ALL_TODO,
} from '@containers/App/constants';

export const initialState = {
  locale: 'en',
  theme: 'dark',
  popup: {
    open: false,
    title: '',
    message: '',
  },
  data: [],
  todo: [],
  loading: false,
};

export const storedKey = ['locale', 'theme', 'todo'];

const appReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LOCAL:
        draft.locale = action.locale;
        break;
      case SET_THEME:
        draft.theme = action.theme;
        break;
      case SET_POPUP:
        draft.popup = action.popup;
        break;
      case SET_LOADING:
        draft.loading = action.loading;
        break;
      case SET_DATA:
        draft.data = action.data;
        break;
      case ADD_TODO:
        draft.todo = [...draft.todo, action.data];
        break;
      case DELETE_TODO:
        draft.todo = draft.todo.filter((item) => item.id !== action.id);
        break;
      case SET_TODO:
        draft.todo = draft.todo.filter((item) => {
          if (item.id === action.id) {
            item.status = !item.status;
          }
          return item;
        });
        break;
      case DELETE_ALL_TODO:
        draft.todo = draft.todo.filter((item) => {
          if (!item.status) {
            return true;
          }
        });
        break;
    }
  });

export default appReducer;
