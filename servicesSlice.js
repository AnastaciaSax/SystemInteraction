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

// вспомогательная функция валидации
const validateService = (service) => {
  if (!service) return "Service data is missing.";

  const { title, category, place, price, photoURL } = service;

  if (!title || title.trim().length < 2)
    return "Title must contain at least 2 characters.";

  if (!category || category.trim().length < 2)
    return "Category is required.";

  if (!place || place.trim().length < 2)
    return "Place is required.";

  if (price === undefined || price === null || isNaN(price))
    return "Price must be a valid number.";

  if (price <= 0)
    return "Price must be greater than zero.";

  if (!photoURL || !photoURL.trim().match(/\.(jpg|jpeg|png|webp|gif)$/i))
    return "Photo URL must point to a valid image file.";

  return null; // если всё ок
};

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
      const validationError = validateService(newService);

      if (validationError) {
        state.error = validationError;
        return;
      }

      state.items.unshift(newService);
      state.error = null;
    },

    updateService: (state, action) => {
      const updated = action.payload;
      const validationError = validateService(updated);

      if (validationError) {
        state.error = validationError;
        return;
      }

      const index = state.items.findIndex((s) => s.id === updated.id);
      if (index !== -1) {
        state.items[index] = updated;
        state.error = null;
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

