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
import { categoriesReducer } from "./categories/sliсe.js";
import { statisticsReducer } from "./statistics/slice.js";
import { globalReducer } from "./global/slice.js";
import { transactionsReducer } from "./transactions/slice.js";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "isLoggedIn", "user"],
};

const statisticsPersistConfig = {
  key: "statistics",
  storage,
  whitelist: ["data", "month", "year", "isIncome"],
};

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    categories: categoriesReducer,
    auth: persistReducer(persistConfig, authReducer),
    statistics: persistReducer(statisticsPersistConfig, statisticsReducer),
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
