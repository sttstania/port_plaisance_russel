const User = require("../models/User");
const jwt = require("jsonwebtoken");

//Token generation 
const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },   //permissions
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }                 // + security
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id },                   // no permissions
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '5d' }               // longer expiry
    );
};

// Loggin
exports.login = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) throw new Error("User not found");

    const isValid = await user.comparePassword(password);
    if (!isValid) throw new Error("Invalid password");

    // generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save RT in DB
    user.refreshToken = refreshToken;
    await user.save();

    return {
        accessToken,
        refreshToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
}

// Token refresh
exports.refreshTokens = async (oldRefreshToken) => {
    try {
        // Verify old RT
        const decoded = jwt.verify(oldRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== oldRefreshToken) {
            throw new Error("Invalid refresh token");
        }   
    } catch (e) {
        throw new Error("Invalid refresh token");
    }
}