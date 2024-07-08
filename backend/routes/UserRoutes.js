const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { userRegister, userLogin } = require('../controllers/userController');

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
      const response = await userRegister(username, email, password);
      res.status(201).json(response);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
      const response = await userLogin(email, password);
      req.session.userId = response.userId; // Set the userId in the session
      res.status(201).json(response);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

module.exports = router;
