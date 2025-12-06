import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Вспомогательные функции для работы с ID
export const getObjectId = (obj) => {
  return obj?._id || obj?.id || obj;
};

export const normalizeObject = (obj) => {
  if (!obj) return obj;
  if (obj._id && !obj.id) {
    return { ...obj, id: obj._id };
  }
  return obj;
};

export const normalizeArray = (arr) => {
  if (!Array.isArray(arr)) return arr;
  return arr.map(normalizeObject);
};

// Функция для преобразования параметров для MongoDB
const adaptParamsForMongo = (params = {}) => {
  const adapted = { ...params };
  
  // Преобразуем countryId -> country (для MongoDB)
  if (adapted.countryId) {
    adapted.country = adapted.countryId;
    delete adapted.countryId;
  }
  
  // Преобразуем routeId -> route (для MongoDB)
  if (adapted.routeId) {
    adapted.route = adapted.routeId;
    delete adapted.routeId;
  }
  
  // Удаляем пустые параметры
  Object.keys(adapted).forEach(key => {
    if (adapted[key] === '' || adapted[key] === null || adapted[key] === undefined) {
      delete adapted[key];
    }
  });
  
  return adapted;
};

// API для стран
export const countriesAPI = {
  getAll: (params = {}) => {
    const adaptedParams = adaptParamsForMongo(params);
    return api.get('/countries', { params: adaptedParams }).then(response => {
      return {
        ...response,
        data: {
          ...response.data,
          data: normalizeArray(response.data.data)
        }
      };
    });
  },
  getById: (id) => api.get(`/countries/${id}`).then(response => ({
    ...response,
    data: {
      ...response.data,
      data: normalizeObject(response.data.data)
    }
  })),
  create: (data) => api.post('/countries', data).then(response => ({
    ...response,
    data: {
      ...response.data,
      data: normalizeObject(response.data.data)
    }
  })),
  update: (id, data) => api.put(`/countries/${id}`, data).then(response => ({
    ...response,
    data: {
      ...response.data,
      data: normalizeObject(response.data.data)
    }
  })),
  delete: (id) => api.delete(`/countries/${id}`),
};

// API для маршрутов
export const routesAPI = {
  getAll: (params = {}) => {
    const adaptedParams = adaptParamsForMongo(params);
    return api.get('/routes', { params: adaptedParams }).then(response => {
      const normalizedData = normalizeArray(response.data.data);
      // Также нормализуем вложенные объекты стран
      const withNormalizedCountries = normalizedData.map(route => ({
        ...route,
        country: normalizeObject(route.country)
      }));
      return {
        ...response,
        data: {
          ...response.data,
          data: withNormalizedCountries
        }
      };
    });
  },
  getById: (id) => api.get(`/routes/${id}`).then(response => ({
    ...response,
    data: {
      ...response.data,
      data: normalizeObject(response.data.data)
    }
  })),
  create: (data) => {
    const adaptedData = { ...data };
    if (adaptedData.countryId) {
      adaptedData.country = adaptedData.countryId;
      delete adaptedData.countryId;
    }
    return api.post('/routes', adaptedData).then(response => ({
      ...response,
      data: {
        ...response.data,
        data: normalizeObject(response.data.data)
      }
    }));
  },
  update: (id, data) => {
    const adaptedData = { ...data };
    if (adaptedData.countryId) {
      adaptedData.country = adaptedData.countryId;
      delete adaptedData.countryId;
    }
    return api.put(`/routes/${id}`, adaptedData).then(response => ({
      ...response,
      data: {
        ...response.data,
        data: normalizeObject(response.data.data)
      }
    }));
  },
  delete: (id) => api.delete(`/routes/${id}`),
};

// API для продаж
export const salesAPI = {
  getAll: (params = {}) => {
    const adaptedParams = adaptParamsForMongo(params);
    return api.get('/sales', { params: adaptedParams }).then(response => {
      const normalizedData = normalizeArray(response.data.data);
      // Нормализуем вложенные объекты
      const withNormalizedRelations = normalizedData.map(sale => ({
        ...sale,
        route: sale.route ? {
          ...normalizeObject(sale.route),
          country: sale.route.country ? normalizeObject(sale.route.country) : undefined
        } : undefined
      }));
      return {
        ...response,
        data: {
          ...response.data,
          data: withNormalizedRelations
        }
      };
    });
  },
  getStats: (params = {}) => {
    const adaptedParams = adaptParamsForMongo(params);
    return api.get('/sales/stats', { params: adaptedParams }).then(response => ({
      ...response,
      data: {
        ...response.data,
        data: normalizeArray(response.data.data)
      }
    }));
  },
  getById: (id) => api.get(`/sales/${id}`).then(response => ({
    ...response,
    data: {
      ...response.data,
      data: normalizeObject(response.data.data)
    }
  })),
  create: (data) => {
    const adaptedData = { ...data };
    if (adaptedData.routeId) {
      adaptedData.route = adaptedData.routeId;
      delete adaptedData.routeId;
    }
    return api.post('/sales', adaptedData).then(response => ({
      ...response,
      data: {
        ...response.data,
        data: normalizeObject(response.data.data)
      }
    }));
  },
  update: (id, data) => {
    const adaptedData = { ...data };
    if (adaptedData.routeId) {
      adaptedData.route = adaptedData.routeId;
      delete adaptedData.routeId;
    }
    return api.put(`/sales/${id}`, adaptedData).then(response => ({
      ...response,
      data: {
        ...response.data,
        data: normalizeObject(response.data.data)
      }
    }));
  },
  delete: (id) => api.delete(`/sales/${id}`),
};

export default api;