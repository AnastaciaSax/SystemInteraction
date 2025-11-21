import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { salesAPI } from '../../services/api';

// Async thunks
export const fetchSales = createAsyncThunk(
  'sales/fetchSales',
  async (params = {}) => {
    const response = await salesAPI.getAll(params);
    return response.data;
  }
);

export const fetchSalesStats = createAsyncThunk(
  'sales/fetchSalesStats',
  async (params = {}) => {
    const response = await salesAPI.getStats(params);
    return response.data;
  }
);

export const fetchSaleById = createAsyncThunk(
  'sales/fetchSaleById',
  async (id) => {
    const response = await salesAPI.getById(id);
    return response.data;
  }
);

export const createSale = createAsyncThunk(
  'sales/createSale',
  async (saleData) => {
    const response = await salesAPI.create(saleData);
    return response.data;
  }
);

export const updateSale = createAsyncThunk(
  'sales/updateSale',
  async ({ id, ...saleData }) => {
    const response = await salesAPI.update(id, saleData);
    return response.data;
  }
);

export const deleteSale = createAsyncThunk(
  'sales/deleteSale',
  async (id) => {
    await salesAPI.delete(id);
    return id;
  }
);

const salesSlice = createSlice({
  name: 'sales',
  initialState: {
    items: [],
    currentItem: null,
    stats: [],
    loading: false,
    error: null,
    pagination: {},
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
    clearStats: (state) => {
      state.stats = [];
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
        state.items = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch sales stats
      .addCase(fetchSalesStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalesStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.data;
      })
      .addCase(fetchSalesStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch sale by ID
      .addCase(fetchSaleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSaleById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItem = action.payload.data;
      })
      .addCase(fetchSaleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create sale
      .addCase(createSale.fulfilled, (state, action) => {
        state.items.push(action.payload.data);
      })
      // Update sale
      .addCase(updateSale.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.data.id);
        if (index !== -1) {
          state.items[index] = action.payload.data;
        }
        if (state.currentItem && state.currentItem.id === action.payload.data.id) {
          state.currentItem = action.payload.data;
        }
      })
      // Delete sale
      .addCase(deleteSale.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        if (state.currentItem && state.currentItem.id === action.payload) {
          state.currentItem = null;
        }
      });
  },
});

export const { setCurrentSale, clearError, clearCurrentSale, clearStats } = salesSlice.actions;
export default salesSlice.reducer;