const express = require('express');
const User = require('../models/User');

const router = express.Router();


// POST /users
router.post('/users', async (req, res) => {

  try {
    const user = new User(req.body);
    const savedUser = await user.save();

    return res.status(201).json(savedUser);

  } catch (err) {

    // Validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ errors });
    }

    // Duplicate email
    if (err.code === 11000) {
      return res.status(400).json({
        error: "Email already exists"
      });
    }

    return res.status(500).json({
      error: "Server error"
    });
  }
});

module.exports = router;