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
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'auth',
    version: 1,
    storage,
    whitelist: ['token', 'isLoggedIn', 'user']
}


export const store = configureStore({
    reducer: {
        //reducers
        auth: persistReducer(persistConfig, authReducer)
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store)