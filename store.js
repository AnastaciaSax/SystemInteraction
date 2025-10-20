import { configureStore } from '@reduxjs/toolkit';
import languageReducer from '../slices/languageSlice';
import servicesReducer from "../slices/servicesSlice";

export const store = configureStore({
  reducer: {
    language: languageReducer,
    services: servicesReducer,
  },
});
