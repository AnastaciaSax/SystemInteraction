import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { countriesAPI } from '../../services/api';

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await countriesAPI.getAll(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createCountry = createAsyncThunk(
  'countries/createCountry',
  async (countryData, { rejectWithValue }) => {
    try {
      const response = await countriesAPI.create(countryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateCountry = createAsyncThunk(
  'countries/updateCountry',
  async ({ id, ...countryData }, { rejectWithValue }) => {
    try {
      const response = await countriesAPI.update(id, countryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteCountry = createAsyncThunk(
  'countries/deleteCountry',
  async (id, { rejectWithValue }) => {
    try {
      await countriesAPI.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
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
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data || [];
        state.pagination = action.payload.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalItems: state.items.length
        };
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCountry.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.items.push(action.payload.data);
        }
      })
      .addCase(createCountry.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateCountry.fulfilled, (state, action) => {
        if (action.payload.data) {
          const index = state.items.findIndex(item => item.id === action.payload.data.id);
          if (index !== -1) {
            state.items[index] = action.payload.data;
          }
        }
      })
      .addCase(updateCountry.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteCountry.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteCountry.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setCurrentCountry, clearError } = countriesSlice.actions;
export default countriesSlice.reducer;