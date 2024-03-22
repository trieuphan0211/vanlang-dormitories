import { combineReducers, configureStore, Tuple } from "@reduxjs/toolkit";
import { alertManagerReducer } from "./features/alert/alert-slice";

const rootReducer = combineReducers({
  alertManagerReducer,
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
