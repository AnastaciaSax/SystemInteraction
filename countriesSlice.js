import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { countriesAPI } from '../../services/api';

// Async thunks
export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async (params = {}) => {
    const response = await countriesAPI.getAll(params);
    return response.data;
  }
);

export const createCountry = createAsyncThunk(
  'countries/createCountry',
  async (countryData) => {
    const response = await countriesAPI.create(countryData);
    return response.data;
  }
);

export const updateCountry = createAsyncThunk(
  'countries/updateCountry',
  async ({ id, ...countryData }) => {
    const response = await countriesAPI.update(id, countryData);
    return response.data;
  }
);

export const deleteCountry = createAsyncThunk(
  'countries/deleteCountry',
  async (id) => {
    await countriesAPI.delete(id);
    return id;
  }
);

const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    items: [],
    currentItem: null,
    loading: false,
    error: null,
    pagination: {},
  },
  reducers: {
    setCurrentCountry: (state, action) => {
      state.currentItem = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch countries
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create country
      .addCase(createCountry.fulfilled, (state, action) => {
        state.items.push(action.payload.data);
      })
      // Update country
      .addCase(updateCountry.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.data.id);
        if (index !== -1) {
          state.items[index] = action.payload.data;
        }
      })
      // Delete country
      .addCase(deleteCountry.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export const { setCurrentCountry, clearError } = countriesSlice.actions;
export default countriesSlice.reducer;