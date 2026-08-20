import express from 'express';
import { db } from '../config/database.js';

const router = express.Router();

// GET /api/coupons
router.get('/', async (req, res) => {
  try {
    const coupons = await db.getCoupons();
    res.json({ success: true, coupons });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch coupons.', error: err.message });
  }
});

// POST /api/coupons/validate
router.post('/validate', async (req, res) => {
  try {
    const { code, subtotal } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, message: 'Coupon code is required.' });
    }

    const result = await db.validateCoupon(code, Number(subtotal) || 0);
    if (!result.valid) {
      return res.status(400).json({ success: false, message: result.message });
    }

    res.json({
      success: true,
      message: 'Voucher applied successfully!',
      coupon: result.coupon,
      discount: result.discount
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to validate coupon.', error: err.message });
  }
});

export default router;
