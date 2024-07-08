const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET, // Replace with your own secret key
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, // Set secure to true if using HTTPS
}));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const userRoutes = require('./routes/UserRoutes');
const vibeRoutes = require('./routes/VibeRoutes');

app.use('/api/users', userRoutes);
app.use('/api', vibeRoutes);
