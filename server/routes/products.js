import express from 'express';
import { db } from '../config/database.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const { page, limit, category, search, minPrice, maxPrice, brand, sortBy } = req.query;
    const data = await db.findProducts({
      page,
      limit,
      category,
      search,
      minPrice,
      maxPrice,
      brand,
      sortBy
    });
    res.json({ success: true, ...data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch products.', error: err.message });
  }
});

// GET /api/products/:slug
router.get('/:slug', async (req, res) => {
  try {
    const product = await db.findProductBySlugOrId(req.params.slug);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch product.', error: err.message });
  }
});

// POST /api/products (Admin Only)
router.post('/', requireAdmin, async (req, res) => {
  try {
    const { title, price, categorySlug, stock, brand } = req.body;
    if (!title || !price || !categorySlug) {
      return res.status(400).json({ success: false, message: 'Title, price, and category are required.' });
    }

    const product = await db.createProduct(req.body);
    res.status(201).json({ success: true, message: 'Product created successfully.', product });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create product.', error: err.message });
  }
});

// PUT /api/products/:id (Admin Only)
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const product = await db.updateProduct(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }
    res.json({ success: true, message: 'Product updated successfully.', product });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update product.', error: err.message });
  }
});

// PATCH /api/products/:id/stock (Admin Quick Modifier)
router.patch('/:id/stock', requireAdmin, async (req, res) => {
  try {
    const { stock } = req.body;
    const product = await db.updateProduct(req.params.id, { stock: Math.max(0, Number(stock)) });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }
    res.json({ success: true, message: 'Stock updated successfully.', product });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update stock.', error: err.message });
  }
});

// DELETE /api/products/:id (Admin Only)
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const deleted = await db.deleteProduct(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }
    res.json({ success: true, message: 'Product deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete product.', error: err.message });
  }
});

export default router;
