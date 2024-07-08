const Vibe = require('../models/Vibe');

async function vibeGet(email, password) {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
        throw new Error('invalid credentials');
    }
    return { message: 'User logged in successfully' };
}


module.exports = { userRegister, userLogin };
