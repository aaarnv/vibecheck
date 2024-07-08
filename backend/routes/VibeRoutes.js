const express = require('express');
const router = express.Router();
const Vibe = require('../models/Vibe');

router.post('/vibes', async (req, res) => {
  const { mood, additionalVibes, note, share } = req.body;
  const userId = req.session.userId;
  try {
    const newVibe = new Vibe({
      userId,
      mood,
      additionalVibes,
      note,
      share
    });

    await newVibe.save();
    res.status(201).json({ message: 'Vibe entry added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/vibes/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const vibes = await Vibe.find({ userId });
    res.status(200).json(vibes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
