import axios from 'axios';

/* ================================
   MAIN BACKEND API
================================ */

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    'https://khantz-backend-ekf7hjafeaa5dzg7.southeastasia-01.azurewebsites.net/api',

  headers: {
    'Content-Type': 'application/json',
  },
});

/* Debug */
console.log('API URL:', api.defaults.baseURL);

/* Error handler */
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('API Error:', err);
    return Promise.reject(err);
  }
);

/* ================================
   SERVICES
================================ */

export const storeService = {
  getAll: () => api.get('/stores/').then((r) => r.data),
};

export const productService = {
  getAll: () => api.get('/products/').then((r) => r.data),
};

export const userService = {
  getAll: () => api.get('/users/').then((r) => r.data),
};

export const orderService = {
  getAll: () => api.get('/orders/').then((r) => r.data),
};

export const reviewService = {
  getAll: (productId) =>
    api.get(`/reviews/?product_id=${productId || ''}`).then((r) => r.data),
};

/* ================================
   AZURE FUNCTION
================================ */

const FUNCTION_API_URL =
  'https://khant-fliter-atbgeef8guf9dkeq.southeastasia-01.azurewebsites.net/api';

const functionApi = axios.create({
  baseURL: FUNCTION_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const contentFilterService = {
  filterComment: (comment) =>
    functionApi.post('/filter_comment', { comment }).then((r) => r.data),
};

export default api;
// ===============================
// API Environment Info (For Layout)
// ===============================

export const getApiConfig = () => {
  const baseURL = api.defaults.baseURL || '';

  const isLocal =
    baseURL.includes('localhost') ||
    baseURL.includes('127.0.0.1');

  return {
    isLocal,
    name: isLocal ? 'Local API' : 'Azure API',
    baseURL,
  };
};
