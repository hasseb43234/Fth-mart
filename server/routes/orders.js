import express from 'express';
import { db } from '../config/database.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// POST /api/orders (Create COD / Card Order)
router.post('/', async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      customerEmail,
      shippingAddress,
      items,
      subtotal,
      shippingFee = 0,
      discount = 0,
      paymentMethod = 'cod'
    } = req.body;

    if (!customerName || !customerPhone || !shippingAddress || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Customer details, shipping address, and order items are required.'
      });
    }

    // Calculate totals & gross profit
    const calculatedSubtotal = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    const calculatedTotalCost = items.reduce((sum, item) => sum + ((item.costPrice || item.price * 0.5) * (item.quantity || 1)), 0);
    const finalTotal = Math.max(0, calculatedSubtotal + shippingFee - discount);
    const grossProfit = finalTotal - calculatedTotalCost;

    const order = await db.createOrder({
      customer: {
        name: customerName,
        phone: customerPhone,
        email: customerEmail || ''
      },
      shippingAddress,
      items,
      subtotal: calculatedSubtotal,
      shippingFee,
      discount,
      total: finalTotal,
      totalCost: calculatedTotalCost,
      grossProfit,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending_cod' : 'paid',
      status: 'pending',
      courier: 'TCS Express'
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully.',
      order
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to place order.', error: err.message });
  }
});

// GET /api/orders (Admin list with status filter)
router.get('/', requireAdmin, async (req, res) => {
  try {
    const { status } = req.query;
    const orders = await db.getOrders({ status });
    res.json({ success: true, count: orders.length, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders.', error: err.message });
  }
});

// GET /api/orders/my-orders (Customer orders)
router.get('/my-orders', requireAuth, async (req, res) => {
  try {
    const orders = await db.getOrders({ userId: req.user.email });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch customer orders.', error: err.message });
  }
});

// GET /api/orders/track/:orderNumber (Public tracking)
router.get('/track/:orderNumber', async (req, res) => {
  try {
    const order = await db.getOrderByNumber(req.params.orderNumber);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: `No order or tracking record found for "${req.params.orderNumber}".`
      });
    }

    // Mock tracking milestones
    const trackingEvents = [
      { status: 'Order Placed', time: order.createdAt, location: 'FTH Mart System', done: true },
      { status: 'Confirmed by Seller', time: order.createdAt, location: order.shippingAddress?.city || 'Lahore Hub', done: order.status !== 'pending' },
      { status: 'Dispatched via TCS Express', time: order.updatedAt || order.createdAt, location: 'Central Logistics Hub', done: ['dispatched', 'in_transit', 'delivered'].includes(order.status) },
      { status: 'Out for Delivery (Cash on Delivery)', time: order.updatedAt || order.createdAt, location: `${order.shippingAddress?.city} Station`, done: ['in_transit', 'delivered'].includes(order.status) },
      { status: 'Delivered', time: order.updatedAt, location: `${order.shippingAddress?.city}`, done: order.status === 'delivered' }
    ];

    res.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        courier: order.courier || 'TCS Express',
        trackingNumber: order.trackingNumber,
        total: order.total,
        paymentMethod: order.paymentMethod,
        itemsCount: order.items?.length || 1,
        shippingAddress: order.shippingAddress,
        trackingEvents
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to track order.', error: err.message });
  }
});

// PATCH /api/orders/:id/status (Admin Dispatch & Status)
router.patch('/:id/status', requireAdmin, async (req, res) => {
  try {
    const { status, trackingNumber } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required.' });
    }

    const updated = await db.updateOrderStatus(req.params.id, status, trackingNumber);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    res.json({ success: true, message: `Order status updated to ${status}.`, order: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update order status.', error: err.message });
  }
});

export default router;
