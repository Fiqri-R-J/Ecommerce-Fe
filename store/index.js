import { combineReducers, configureStore } from "@reduxjs/toolkit";

import auth from "./reducer/auth";
import product from "./reducer/product";
import checkout from "./reducer/checkout";

import { persistStore, persistReducer } from "redux-persist";

import storageSession from "redux-persist/lib/storage/session";

// import { getDefaultMiddleware } from '@reduxjs/toolkit';

// const customizedMiddleware = getDefaultMiddleware({
//   serializableCheck: false,
// });

//COMBINE ALL REDUCERS
const reducers = combineReducers({
  auth,
  product,
  checkout,
});

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["auth", "product", "checkout"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
