// src/store/servicesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import servicesData from "../data/db.json";

// имитация загрузки с сервера
export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (_, { rejectWithValue }) => {
    try {
      return servicesData.services;
    } catch (error) {
      return rejectWithValue("Failed to load services.");
    }
  }
);

const servicesSlice = createSlice({
  name: "services",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
addService: (state, action) => {
  const newService = action.payload;
  if (!newService.title || newService.price < 0) {
    state.error = "Invalid service data.";
    return;
  }
  state.items.unshift(newService);
  state.error = null; // сброс ошибки
},
updateService: (state, action) => {
  const updated = action.payload;
  const index = state.items.findIndex((s) => s.id === updated.id);
  if (!updated.title || updated.price < 0) {
    state.error = "Invalid service data.";
    return;
  }
  if (index !== -1) {
    state.items[index] = updated;
  } else {
    state.error = "Service not found.";
  }
},
    deleteService: (state, action) => {
      state.items = state.items.filter((s) => s.id !== action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addService, updateService, deleteService, clearError } =
  servicesSlice.actions;
  
  // **Селекторы Redux**
export const selectServices = (state) => state.services.items;
export const selectLoading = (state) => state.services.loading;
export const selectError = (state) => state.services.error;

export default servicesSlice.reducer;
