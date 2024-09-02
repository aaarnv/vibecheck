const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends: [
    {
      type: String,
      ref: 'User',
    },
  ],
  friendRequests: [
    {
      from: { type: String, ref: 'User' },
      status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
      to: { type: String, ref: 'User' },
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
