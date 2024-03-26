import { combineReducers, configureStore, Tuple } from "@reduxjs/toolkit";
import { alertManagerReducer } from "./features/alert/alert-slice";
import { qrManagerReducer } from "./features/qr-code/qr-slice";

const rootReducer = combineReducers({
  alertManagerReducer,
  qrManagerReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: true,
      }),

    devTools: true,
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
