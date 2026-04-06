const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  console.log(`[AUTH-TRACE] 👤 Signup Attempt: ${email} (Name: ${name})`);

  try {
    // 1. Check for existing user (Safety check before attempting save)
    let user = await User.findOne({ email });
    if (user) {
      console.warn(`[AUTH-TRACE] ⚠️ Signup Failed: User already exists (${email})`);
      return res.status(400).json({ message: 'User with this email already registered.' });
    }

    // 2. Hash Password
    console.log(`[AUTH-TRACE] 🔒 Hashing password for: ${email}`);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create and Save User
    user = new User({
      name,
      email,
      password: hashedPassword,
      role: 'user' // Defaulting to user per simplification
    });

    console.log(`[AUTH-TRACE] 💾 Saving new user to MongoDB...`);
    await user.save();
    console.log(`[AUTH-TRACE] ✅ Signup Success: ${email}`);
    
    res.status(201).json({ message: 'User registered successfully. You can now login.' });
  } catch (error) {
    console.error(`[CRITICAL-ERROR] ❌ Signup Crash for ${email}:`, error.stack);
    
    // Explicit MongoDB duplicate key handling (if the first check failed or race condition)
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email address is already in use.' });
    }

    res.status(500).json({ 
      message: 'Internal server error during registration.', 
      error: error.message 
    });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(`[AUTH-TRACE] 🔑 Login Attempt for: ${email}`);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.warn(`[AUTH-TRACE] ⚠️ Login Failed: User not found (${email})`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.warn(`[AUTH-TRACE] ⚠️ Login Failed: Incorrect password for ${email}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log(`[AUTH-TRACE] 🎫 Generating JWT for: ${email}`);
    const payload = {
      id: user._id,
      role: user.role
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' },
      (err, token) => {
        if (err) {
          console.error(`[AUTH-TRACE] ❌ JWT Signing Error for ${email}:`, err);
          throw err;
        }
        
        console.log(`[AUTH-TRACE] ✅ Login Success: ${email}`);
        res.json({ 
          token, 
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        });
      }
    );
  } catch (error) {
    console.error(`[CRITICAL-ERROR] ❌ Login Crash for ${email}:`, error.stack);
    res.status(500).json({ message: 'Server error during login.', error: error.message });
  }
});

module.exports = router;
