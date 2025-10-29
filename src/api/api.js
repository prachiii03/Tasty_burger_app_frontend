import axios from 'axios';

// ✅ FIXED: Remove /api from base URL since routes are now at root level
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance
const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add auth token to requests
API.interceptors.request.use((config) => {
  const user = localStorage.getItem('user');
  if (user && user !== 'undefined') {
    try {
      const userData = JSON.parse(user);
      const token = userData.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.error('Error parsing user token:', err);
    }
  }
  
  // Log the request for debugging
  console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  
  return config;
});

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => {
    console.log(`✅ API Success: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.response?.data?.message || error.message,
      data: error.response?.data
    });
    
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Set auth token helper
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};

// Auth API
export const authAPI = {
  login: (data) => API.post('/auth/login', data),
  register: (data) => API.post('/auth/register', data),
  get: (url) => API.get(url),
  post: (url, data) => API.post(url, data),
  put: (url, data) => API.put(url, data),
  delete: (url) => API.delete(url),
};

// Products API
export const productsAPI = {
  getProducts: () => API.get('/products'),
  getProduct: (id) => API.get(`/products/${id}`),
  getProductsByCategory: (category) => API.get(`/products/category/${category}`),
};

// Cart API
export const cartAPI = {
  getCart: () => API.get('/cart'),
  addToCart: (data) => API.post('/cart', data),
  removeFromCart: (data) => API.post('/cart/remove', data),
  clearCart: () => API.post('/cart/clear'),
};

// Orders API
export const ordersAPI = {
  createOrder: (data) => API.post('/orders', data),
  getOrders: () => API.get('/orders'),
  getOrder: (id) => API.get(`/orders/${id}`),
  getUserOrders: () => API.get('/orders/user'),
};

// ✅ FIXED: PhonePe endpoints - use API directly instead of authAPI
export const phonepeAPI = {
  createPayment: (paymentData) => API.post('/phonepe/pay', paymentData),
  checkStatus: (statusData) => API.post('/phonepe/check-status', statusData),
};

// User Dashboard API calls
export const userAPI = {
  // Dashboard overview
  getDashboardOverview: () => API.get('/user/dashboard/overview'),
  
  // Profile
  getProfile: () => API.get('/user/profile'),
  updateProfile: (data) => API.put('/user/profile', data),
  
  // Orders
  getOrders: (page = 1, limit = 10) => 
    API.get(`/user/orders?page=${page}&limit=${limit}`),
  
  // Addresses
  getAddresses: () => API.get('/user/addresses'),
  addAddress: (data) => API.post('/user/addresses', data),
  updateAddress: (id, data) => API.put(`/user/addresses/${id}`, data),
  deleteAddress: (id) => API.delete(`/user/addresses/${id}`),
  
  // Wishlist
  getWishlist: () => API.get('/user/wishlist'),
  addToWishlist: (productId) => API.post('/user/wishlist', { productId }),
  removeFromWishlist: (productId) => API.delete(`/user/wishlist/${productId}`),
  checkWishlist: (productId) => API.get(`/user/wishlist/check/${productId}`),
};

export default API;