const mongoose = require('mongoose');

const vibeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  mood: {
    type: Number,
    required: true,
  },
  additionalVibes: [
    {
      emotion: {
        type: String,
        enum: ['anger', 'disgust', 'fear', 'envy', 'anxiety', 'ennui', 'embarrassment'],
        required: true
      },
      value: {
        type: Number,
        required: true,
      }
    }
  ],
  note: {
    type: String
  },
  share: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Vibe = mongoose.model('Vibe', vibeSchema);

module.exports = Vibe;