import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Import Initial Seed Catalogues
import { MARKAZ_PRODUCTS_500 } from '../data/seed-products.js';
import {
  INITIAL_CATEGORIES,
  INITIAL_COUPONS,
  INITIAL_ORDERS
} from '../data/seed-data.js';

// Default Admin & Customer users
const DEFAULT_USERS = [
  {
    id: 'usr-admin-01',
    name: 'Administrator',
    email: 'admin@fthmart.pk',
    phone: '03001234567',
    passwordHash: bcrypt.hashSync('admin123', 10),
    role: 'admin',
    createdAt: new Date().toISOString()
  },
  {
    id: 'usr-customer-01',
    name: 'Saad Ur Rehman',
    email: 'saad.rehman@gmail.com',
    phone: '03214892104',
    passwordHash: bcrypt.hashSync('saad123', 10),
    role: 'customer',
    addresses: [
      {
        id: 'addr-1',
        isDefault: true,
        recipientName: 'Saad Ur Rehman',
        phone: '03214892104',
        province: 'Punjab',
        city: 'Lahore',
        area: 'DHA Phase 5, Sector C',
        street: 'House 412, Street 8',
        landmark: 'Near Jalal Sons'
      }
    ],
    createdAt: new Date().toISOString()
  }
];

class Database {
  constructor() {
    this.data = {
      users: DEFAULT_USERS,
      categories: INITIAL_CATEGORIES,
      products: MARKAZ_PRODUCTS_500,
      orders: INITIAL_ORDERS,
      coupons: INITIAL_COUPONS,
      reviews: []
    };
    this.init();
  }

  init() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_FILE)) {
      try {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(fileContent);
        this.data = { ...this.data, ...parsed };
      } catch (err) {
        console.error('Error reading db.json, re-initializing seed:', err);
        this.save();
      }
    } else {
      this.save();
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to persist to db.json:', err);
    }
  }

  // --- Users ---
  async findUserByEmail(email) {
    return this.data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  async findUserById(id) {
    return this.data.users.find((u) => u.id === id);
  }

  async createUser(userData) {
    const user = {
      id: `usr-${Date.now()}`,
      addresses: [],
      role: 'customer',
      createdAt: new Date().toISOString(),
      ...userData
    };
    this.data.users.push(user);
    this.save();
    return user;
  }

  // --- Products ---
  async findProducts({
    page = 1,
    limit = 24,
    category,
    search,
    minPrice,
    maxPrice,
    brand,
    sortBy = 'default'
  } = {}) {
    let result = [...this.data.products];

    if (category && category !== 'all') {
      result = result.filter(
        (p) => p.categorySlug === category || p.subcategorySlug === category
      );
    }

    if (brand) {
      result = result.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
    }

    if (minPrice) {
      result = result.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      result = result.filter((p) => p.price <= Number(maxPrice));
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.sku?.toLowerCase().includes(q) ||
          p.categorySlug?.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === 'price_asc') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price_desc') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'orders') result.sort((a, b) => (b.ordersCount || 0) - (a.ordersCount || 0));
    else if (sortBy === 'rating') result.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    const total = result.length;
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 24;
    const totalPages = Math.ceil(total / limitNum) || 1;
    const startIndex = (pageNum - 1) * limitNum;
    const paginated = result.slice(startIndex, startIndex + limitNum);

    return {
      products: paginated,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages
      }
    };
  }

  async findProductBySlugOrId(identifier) {
    return this.data.products.find(
      (p) => p.slug === identifier || p.id === identifier
    );
  }

  async createProduct(productData) {
    const newProduct = {
      id: `prod-${Date.now()}`,
      sku: productData.sku || `MKZ-${Date.now().toString().slice(-6)}`,
      rating: 5.0,
      reviewsCount: 0,
      ordersCount: 0,
      stock: Number(productData.stock) || 50,
      supplierCost: Number(productData.supplierCost) || Math.round(productData.price * 0.5),
      createdAt: new Date().toISOString(),
      ...productData
    };
    this.data.products.unshift(newProduct);
    this.save();
    return newProduct;
  }

  async updateProduct(id, updateData) {
    const idx = this.data.products.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    this.data.products[idx] = {
      ...this.data.products[idx],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    this.save();
    return this.data.products[idx];
  }

  async deleteProduct(id) {
    const initialLen = this.data.products.length;
    this.data.products = this.data.products.filter((p) => p.id !== id);
    this.save();
    return this.data.products.length < initialLen;
  }

  // --- Categories ---
  async getCategories() {
    return this.data.categories;
  }

  async createCategory(catData) {
    const newCat = {
      id: `cat-${Date.now()}`,
      itemCount: 0,
      subcategories: [],
      ...catData
    };
    this.data.categories.push(newCat);
    this.save();
    return newCat;
  }

  // --- Orders ---
  async getOrders({ userId, status } = {}) {
    let list = [...this.data.orders];
    if (userId) list = list.filter((o) => o.userId === userId || o.customer?.email === userId);
    if (status && status !== 'all') list = list.filter((o) => o.status === status);
    return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  async getOrderByNumber(orderNumber) {
    return this.data.orders.find(
      (o) => o.id === orderNumber || o.orderNumber === orderNumber || o.trackingNumber === orderNumber
    );
  }

  async createOrder(orderData) {
    const orderNumber = `FTH-${new Date().getFullYear()}-${String(Math.floor(100000 + Math.random() * 900000))}`;
    const trackingNumber = `TCS-PK-${Math.floor(100000000 + Math.random() * 900000000)}`;

    const newOrder = {
      id: orderNumber,
      orderNumber: orderNumber,
      trackingNumber: trackingNumber,
      courier: 'TCS Express',
      paymentStatus: orderData.paymentMethod === 'cod' ? 'pending_cod' : 'paid',
      status: 'pending',
      rtoRisk: 'low',
      createdAt: new Date().toISOString(),
      ...orderData
    };

    // Deduct stock
    if (orderData.items && Array.isArray(orderData.items)) {
      orderData.items.forEach((item) => {
        const prod = this.data.products.find((p) => p.id === item.productId);
        if (prod) {
          prod.stock = Math.max(0, prod.stock - (item.quantity || 1));
          prod.ordersCount = (prod.ordersCount || 0) + (item.quantity || 1);
        }
      });
    }

    this.data.orders.unshift(newOrder);
    this.save();
    return newOrder;
  }

  async updateOrderStatus(orderId, status, trackingNumber) {
    const order = this.data.orders.find((o) => o.id === orderId || o.orderNumber === orderId);
    if (!order) return null;
    order.status = status;
    if (trackingNumber) order.trackingNumber = trackingNumber;
    order.updatedAt = new Date().toISOString();
    this.save();
    return order;
  }

  // --- Coupons ---
  async getCoupons() {
    return this.data.coupons;
  }

  async validateCoupon(code, subtotal = 0) {
    const coupon = this.data.coupons.find(
      (c) => c.code.toUpperCase() === code.toUpperCase() && c.active
    );
    if (!coupon) return { valid: false, message: 'Invalid or expired voucher code.' };
    if (coupon.minSpend && subtotal < coupon.minSpend) {
      return {
        valid: false,
        message: `Minimum order amount of Rs ${coupon.minSpend.toLocaleString()} required.`
      };
    }
    const discount = coupon.discountPercent > 0
      ? Math.round((subtotal * coupon.discountPercent) / 100)
      : coupon.fixedDiscount;
    return { valid: true, coupon, discount };
  }
}

export const db = new Database();
