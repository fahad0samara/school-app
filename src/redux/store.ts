import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import darkModeReducer from "./DarkMod/darkModeSlice";
import languageReducer from "./Language/languageSlice";

// إعدادات redux-persist
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["darkmode", "language"], // تحديد العناصر  تريد تخزينها
};

// دمج المخفضات (reducers) مع persistReducer
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    darkmode: darkModeReducer,
    language: languageReducer,
  })
);

// إعداد المتجر
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // تجاهل هذه الإجراءات التي تأتي من redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// إنشاء persistor لحفظ الحالة
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppDispatch = typeof store.dispatch;
