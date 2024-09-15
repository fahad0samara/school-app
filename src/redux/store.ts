import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";


import darkModeReducer from "./DarkMod/darkModeSlice";
import languageReducer from "./Language/languageSlice"

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["darkmode", "language"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    //   auth: authReducer,
    // cart: cartReducer,

    darkmode: darkModeReducer,
    language: languageReducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppDispatch = typeof store.dispatch;
