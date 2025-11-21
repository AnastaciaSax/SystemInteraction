import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from './slices/countriesSlice';
import routesReducer from './slices/routesSlice';
import salesReducer from './slices/salesSlice';

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    routes: routesReducer,
    sales: salesReducer,
  },
});

export default store;