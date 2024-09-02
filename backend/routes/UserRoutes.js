const express = require('express');
const router = express.Router();
const { userRegister, userLogin } = require('../controllers/userController');
const isAuthenticated = require('./VibeRoutes');
const User = require('../models/User'); // Adjust the path as necessary



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
      req.session.visited = true;
      req.session.userId = response._id; // Set the userId in the session
      res.status(201).json(response);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

router.get('/search', isAuthenticated, async (req, res) => {
  try {
    const { query } = req.query;
    // Ensure query is not empty or undefined
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is missing' });
    }

    // Perform the search
    const users = await User.find({
      $or: [
        { email: new RegExp(query, 'i') }, 
        { userId: new RegExp(query, 'i') }
      ],
    }).select('userId email');

    // Respond with the users
    res.json(users);
  } catch (err) {
    console.error('Error during user search:', err.message);
    res.status(500).json({ error: err.message });
  }
});

router.post('/:id/friend-request', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params; // ID of the user to send a friend request to
    const senderId = req.session.userId;
    const sender = await User.findById(senderId);
    const recipient = await User.findById(id);
    if (!recipient) {
      console.log("recipient not found");
      return res.status(404).json({ error: 'User not found' });
    }

    const alreadyRequested = recipient.friendRequests.some(
      (req) => req.from === sender.userId
    );

    if (alreadyRequested) {
      return res.status(400).json({ error: 'Friend request already sent' });
    }

    recipient.friendRequests.push({ from: sender.userId });
    await recipient.save();
    console.log(recipient);
    res.json({ message: 'Friend request sent' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.post('/:id/respond-friend-request', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params; // ID of the user who sent the friend request
    const { response } = req.body; // 'accepted' or 'rejected'
    const userId = req.session.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const friendRequestIndex = user.friendRequests.findIndex(
      (req) => req.from.toString() === id
    );

    if (friendRequestIndex === -1) {
      return res.status(404).json({ error: 'Friend request not found' });
    }

    // Get the friend request
    const friendRequest = user.friendRequests[friendRequestIndex];

    // Update the friend request status
    friendRequest.status = response;

    if (response === 'accepted') {
      user.friends.push(id);

      // Find the sender
      const sender = await User.findOne({ userId: id });

      if (!sender) {
        return res.status(404).json({ error: 'Sender not found' });
      }
      sender.friends.push(user.userId);

      // Save the sender's document
      await sender.save();
    }

    user.friendRequests.splice(friendRequestIndex, 1);

    await user.save();

    res.json({ message: `Friend request ${response}` });
  } catch (err) {
    console.error('Error responding to friend request:', err);
    res.status(500).json({ error: err.message });
  }
});


router.get('/friend-requests', isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.friendRequests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/friends', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.friends);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
