const express = require('express');
const router = express.Router();
const Vibe = require('../models/Vibe');
const User = require('../models/User');
const mongoose = require('mongoose');

// In your Express backend
router.get('/auth/check', (req, res) => {
  if (req.session.userId) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});


// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  } else {
    res.status(401).json({ error: 'Unauthorized: Please log in' });
  }
};

router.post('/vibes', isAuthenticated, async (req, res) => {
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
    console.log(error.message);
  }
});

router.get('/vibes', isAuthenticated, async (req, res) => {
  const userId = req.session.userId;
  try {
    const vibes = await Vibe.find({ userId });
    res.status(200).json(vibes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a vibe by ID
router.delete('/vibes/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVibe = await Vibe.findByIdAndDelete(id);

    if (!deletedVibe) {
      return res.status(404).json({ error: 'Vibe not found' });
    }

    res.status(200).json({ message: 'Vibe deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/vibes/:id/share', isAuthenticated, async (req, res) => {
  try {
    const { share } = req.body;
    const updatedVibe = await Vibe.findByIdAndUpdate(req.params.id, { share }, { new: true });
    if (!updatedVibe) {
      return res.status(404).json({ error: 'Vibe not found' });
    }
    res.json(updatedVibe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Converts an array of userId strings to an array of ObjectId instances.
 * @param {Array<string>} userIds - The array of userId strings.
 * @returns {Array<ObjectId>} - The array of ObjectId instances.
 */
const convertUserIdsToObjectIds = async (userIds) => {
  const objectIds = [];

  try {
    for (const userId of userIds) {
      // Find the user by their userId and get their ObjectId
      const user = await User.findOne({ userId }).select('_id');

      // If the user is found, push their ObjectId to the array
      if (user) {
        objectIds.push(user._id);
      }
    }

    return objectIds;
  } catch (err) {
    console.error('Error converting userIds to ObjectIds:', err.message);
    throw err;
  }
};


router.get('/vibes/friends', isAuthenticated, async (req, res) => {
  try {
    // Get the authenticated user's ID from the session
    const userId = req.session.userId;

    // Find the user in the database, and populate the 'friends' field
    const user = await User.findById(userId)
    //.populate('friends');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Extract friends' userIds
    const friendObjectIds = await convertUserIdsToObjectIds(user.friends);
    //.map(friend => friend.userId);
    console.log(friendObjectIds);
    // Find the vibes for all friends
    const friendsVibes = await Vibe.find({ userId: { $in: friendObjectIds } }).populate('userId', 'userId');

    console.log(friendsVibes);
    // Respond with the friends' vibes
    res.json(friendsVibes);
  } catch (err) {
    console.error('Error fetching friends\' vibes:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
