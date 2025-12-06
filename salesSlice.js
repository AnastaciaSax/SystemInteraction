// store/slices/salesSlice.js - полная исправленная версия
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { salesAPI } from '../../services/api';

// Async thunks
export const fetchSales = createAsyncThunk(
  'sales/fetchSales',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await salesAPI.getAll(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchSalesStats = createAsyncThunk(
  'sales/fetchSalesStats',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await salesAPI.getStats(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createSale = createAsyncThunk(
  'sales/createSale',
  async (saleData, { rejectWithValue }) => {
    try {
      const response = await salesAPI.create(saleData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateSale = createAsyncThunk(
  'sales/updateSale',
  async ({ id, ...saleData }, { rejectWithValue }) => {
    try {
      const response = await salesAPI.update(id, saleData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteSale = createAsyncThunk(
  'sales/deleteSale',
  async (id, { rejectWithValue }) => {
    try {
      await salesAPI.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const salesSlice = createSlice({
  name: 'sales',
  initialState: {
    items: [], // гарантируем, что это массив
    currentItem: null,
    loading: false,
    error: null,
    pagination: {},
    stats: [],
  },
  reducers: {
    setCurrentSale: (state, action) => {
      state.currentItem = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentSale: (state) => {
      state.currentItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch sales
      .addCase(fetchSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.loading = false;
        // Гарантируем, что items всегда массив
        state.items = action.payload.data || action.payload || [];
        state.pagination = action.payload.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalItems: state.items.length
        };
      })
      .addCase(fetchSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.items = []; // в случае ошибки сбрасываем к пустому массиву
      })
      // Fetch stats
      .addCase(fetchSalesStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalesStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.data || action.payload || [];
      })
      .addCase(fetchSalesStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.stats = [];
      })
      // Create sale
      .addCase(createSale.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.items.push(action.payload.data);
        }
      })
      .addCase(createSale.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Update sale
      .addCase(updateSale.fulfilled, (state, action) => {
        if (action.payload.data) {
          const index = state.items.findIndex(item => item.id === action.payload.data.id);
          if (index !== -1) {
            state.items[index] = action.payload.data;
          }
        }
      })
      .addCase(updateSale.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Delete sale
      .addCase(deleteSale.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        if (state.currentItem && state.currentItem.id === action.payload) {
          state.currentItem = null;
        }
      })
      .addCase(deleteSale.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setCurrentSale, clearError, clearCurrentSale } = salesSlice.actions;
export default salesSlice.reducer;