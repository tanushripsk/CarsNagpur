const jwt = require('jsonwebtoken');

const generateTokenAndSetCookies = (res, userId) => {
    try {
        if (!userId) {
            throw new Error('User ID is required for token generation');
        }

        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax', // Adjust based on your needs (e.g., 'strict' or 'none')
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return token;
    } catch (err) {
        console.error('Error generating token:', err);
        throw err;
    }
};

module.exports = { generateTokenAndSetCookies };
