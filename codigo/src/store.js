import { createSlice, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    user: null,
    accessToken: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { login, logout } = sessionSlice.actions;

const persistConfig = {
  key: 'root',
  storage,
};

const persistedSessionReducer = persistReducer(
  persistConfig,
  sessionSlice.reducer
);

export const store = configureStore({
  reducer: { session: persistedSessionReducer },
});
export const persistor = persistStore(store);
