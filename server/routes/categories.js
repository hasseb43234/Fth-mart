import express from 'express';
import { db } from '../config/database.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/categories
router.get('/', async (req, res) => {
  try {
    const categories = await db.getCategories();
    res.json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch categories.', error: err.message });
  }
});

// POST /api/categories (Admin Only)
router.post('/', requireAdmin, async (req, res) => {
  try {
    const { name, slug } = req.body;
    if (!name || !slug) {
      return res.status(400).json({ success: false, message: 'Category name and slug are required.' });
    }
    const category = await db.createCategory(req.body);
    res.status(201).json({ success: true, message: 'Category created successfully.', category });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create category.', error: err.message });
  }
});

export default router;
