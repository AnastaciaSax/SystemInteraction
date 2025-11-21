import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { routesAPI } from '../../services/api';

// Async thunks
export const fetchRoutes = createAsyncThunk(
  'routes/fetchRoutes',
  async (params = {}) => {
    const response = await routesAPI.getAll(params);
    return response.data;
  }
);

export const fetchRouteById = createAsyncThunk(
  'routes/fetchRouteById',
  async (id) => {
    const response = await routesAPI.getById(id);
    return response.data;
  }
);

export const createRoute = createAsyncThunk(
  'routes/createRoute',
  async (routeData) => {
    const response = await routesAPI.create(routeData);
    return response.data;
  }
);

export const updateRoute = createAsyncThunk(
  'routes/updateRoute',
  async ({ id, ...routeData }) => {
    const response = await routesAPI.update(id, routeData);
    return response.data;
  }
);

export const deleteRoute = createAsyncThunk(
  'routes/deleteRoute',
  async (id) => {
    await routesAPI.delete(id);
    return id;
  }
);

const routesSlice = createSlice({
  name: 'routes',
  initialState: {
    items: [],
    currentItem: null,
    loading: false,
    error: null,
    pagination: {},
  },
  reducers: {
    setCurrentRoute: (state, action) => {
      state.currentItem = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentRoute: (state) => {
      state.currentItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch routes
      .addCase(fetchRoutes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoutes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchRoutes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch route by ID
      .addCase(fetchRouteById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRouteById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItem = action.payload.data;
      })
      .addCase(fetchRouteById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create route
      .addCase(createRoute.fulfilled, (state, action) => {
        state.items.push(action.payload.data);
      })
      // Update route
      .addCase(updateRoute.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.data.id);
        if (index !== -1) {
          state.items[index] = action.payload.data;
        }
        if (state.currentItem && state.currentItem.id === action.payload.data.id) {
          state.currentItem = action.payload.data;
        }
      })
      // Delete route
      .addCase(deleteRoute.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        if (state.currentItem && state.currentItem.id === action.payload) {
          state.currentItem = null;
        }
      });
  },
});

export const { setCurrentRoute, clearError, clearCurrentRoute } = routesSlice.actions;
export default routesSlice.reducer;