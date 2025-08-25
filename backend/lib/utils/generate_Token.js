import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, res) => {
    // Generate JWT token
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '15d' // Token valid for 7 days
    });

    // Set token in HTTP-only cookie
    res.cookie('token', token, {
        httpOnly: true, // Prevents XSS attacks cross-site scripting attacks
        secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
        sameSite: 'Strict', // CSRF protection
        maxAge: 15*24*60*60*1000 // 15 days in milliseconds
    });
}