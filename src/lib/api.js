// FTH Mart Frontend API Client
const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const api = {
  // --- Auth ---
  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  async register(userData) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return res.json();
  },

  // --- Products ---
  async getProducts(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/products?${query}`);
    return res.json();
  },

  async getProduct(slug) {
    const res = await fetch(`${API_BASE}/products/${slug}`);
    return res.json();
  },

  async createProduct(productData, token) {
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    });
    return res.json();
  },

  async updateStock(productId, stock, token) {
    const res = await fetch(`${API_BASE}/products/${productId}/stock`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ stock })
    });
    return res.json();
  },

  // --- Categories ---
  async getCategories() {
    const res = await fetch(`${API_BASE}/categories`);
    return res.json();
  },

  // --- Orders ---
  async createOrder(orderData) {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    return res.json();
  },

  async trackOrder(orderNumber) {
    const res = await fetch(`${API_BASE}/orders/track/${orderNumber}`);
    return res.json();
  },

  async getAdminOrders(token, status = 'all') {
    const res = await fetch(`${API_BASE}/orders?status=${status}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
  },

  async updateOrderStatus(orderId, status, token) {
    const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    return res.json();
  },

  // --- Coupons ---
  async validateCoupon(code, subtotal) {
    const res = await fetch(`${API_BASE}/coupons/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, subtotal })
    });
    return res.json();
  },

  // --- Analytics ---
  async getAnalytics(token) {
    const res = await fetch(`${API_BASE}/analytics/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
  }
};
