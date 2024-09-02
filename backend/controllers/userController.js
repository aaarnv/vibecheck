const User = require('../models/User');
const bcrypt = require('bcryptjs');

async function getUser(userId) {
    const existingUser = await User.findOne({ userId });
    return existingUser;
}

async function userRegister(userId, email, password) {
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
        throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
        userId,
        email,
        password: hashedPassword,
    });

    await newUser.save();
    return { message: 'User registered successfully' };
}

async function userLogin(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('invalid credentials user');
    }
    // Compare the plain text password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
       throw new Error('Invalid credentials');
    }
    return user;
}

module.exports = { userRegister, userLogin };
