import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../config/database.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fth_mart_super_secure_jwt_secret_pk_2026';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required.' });
    }

    const existing = await db.findUserByEmail(email);
    if (existing) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await db.createUser({
      name,
      email,
      phone: phone || '',
      passwordHash
    });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    const { passwordHash: _, ...safeUser } = user;
    res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      token,
      user: safeUser
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error during registration.', error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const user = await db.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    const { passwordHash: _, ...safeUser } = user;
    res.json({
      success: true,
      message: 'Signed in successfully.',
      token,
      user: safeUser
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error during login.', error: err.message });
  }
});

// GET /api/auth/me
router.get('/me', requireAuth, async (req, res) => {
  const { passwordHash: _, ...safeUser } = req.user;
  res.json({ success: true, user: safeUser });
});

// POST /api/auth/address
router.post('/address', requireAuth, async (req, res) => {
  try {
    const address = {
      id: `addr-${Date.now()}`,
      isDefault: (req.user.addresses || []).length === 0,
      ...req.body
    };

    req.user.addresses = req.user.addresses || [];
    req.user.addresses.push(address);
    db.save();

    res.json({ success: true, message: 'Address added successfully.', addresses: req.user.addresses });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to add address.', error: err.message });
  }
});

export default router;
