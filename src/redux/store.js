import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { categoriesReducer } from "./categories/slise.js";
import { statisticsReducer } from "./statistics/slice.js";
import { globalReducer } from "./global/slice.js";
import { transactionsReducer } from "./transactions/slice.js";

const persistConfig = {
  key: "auth",
  version: 1,
  storage,
  whitelist: ["accessToken", "isLoggedIn", "user"],
};

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    categories: categoriesReducer,
    auth: persistReducer(persistConfig, authReducer),
    statistics: statisticsReducer,
    global: globalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
