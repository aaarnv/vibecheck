const express = require('express');
const router = express.Router();
const Mood = require('../models/Mood');

router.post('/moods', async (req, res) => {
  const { userId, mood } = req.body;
  try {
    const newMood = new Mood({ userId, mood });
    await newMood.save();
    res.status(201).json(newMood);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/moods/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const moods = await Mood.find({ userId });
    res.status(200).json(moods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
