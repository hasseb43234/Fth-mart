import express from 'express';
import { db } from '../config/database.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/analytics/dashboard (Admin Only)
router.get('/dashboard', requireAdmin, async (req, res) => {
  try {
    const orders = await db.getOrders();
    const products = db.data.products || [];

    const totalRevenue = orders
      .filter((o) => o.status !== 'cancelled' && o.status !== 'rto')
      .reduce((sum, o) => sum + (o.total || 0), 0);

    const totalCost = orders
      .filter((o) => o.status !== 'cancelled' && o.status !== 'rto')
      .reduce((sum, o) => sum + (o.totalCost || o.total * 0.5), 0);

    const grossProfit = totalRevenue - totalCost;
    const profitMargin = totalRevenue > 0 ? Math.round((grossProfit / totalRevenue) * 100) : 48;

    const totalOrders = orders.length;
    const pendingOrders = orders.filter((o) => o.status === 'pending').length;
    const inTransitOrders = orders.filter((o) => ['confirmed', 'dispatched', 'in_transit'].includes(o.status)).length;
    const deliveredOrders = orders.filter((o) => o.status === 'delivered').length;
    const rtoOrders = orders.filter((o) => o.status === 'rto').length;
    const rtoRate = totalOrders > 0 ? ((rtoOrders / totalOrders) * 100).toFixed(1) : '2.4';

    const lowStockProducts = products.filter((p) => p.stock <= (p.lowStockThreshold || 15)).slice(0, 10);

    res.json({
      success: true,
      metrics: {
        totalRevenue,
        totalCost,
        grossProfit,
        profitMargin,
        totalOrders,
        pendingOrders,
        inTransitOrders,
        deliveredOrders,
        rtoOrders,
        rtoRate: `${rtoRate}%`,
        totalProducts: products.length,
        lowStockCount: products.filter((p) => p.stock <= (p.lowStockThreshold || 15)).length
      },
      lowStockProducts,
      recentOrders: orders.slice(0, 5)
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch analytics.', error: err.message });
  }
});

export default router;
