import User from '../models/user_module.js';
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from '../lib/utils/generate_Token.js';

export const  singup = async (req, res) => {
    try {
        const { username, fullName, password, email } = req.body;

        // Validation
        if (!username || !fullName || !password || !email) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Password length check
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        // Check if username already exists
        const existingUsername = await User.findOne({  username  });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already in use' });
        }

        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash password, if someone gets access to the database, they won't see the actual password
        // Change password to hashed password(ex: 123456 to $2a$1QoeG6Lui5f2r9g6VqT)
        const salt = await bcrypt.getSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            fullName,
            password: hashedPassword,
            email
        });

        // Save user to database
        if(newUser) {
            generateTokenAndSetCookie(newUser._id, res); 
            await newUser.save();
            res.status(201).json({ 
                message: 'User created successfully', 
                user: {
                    _id: newUser._id,
                    username: newUser.username,
                    fullName: newUser.fullName,
                    email: newUser.email,
                    followers: newUser.followers,
                    following: newUser.following,
                    profileImg: newUser.profileImg,
                    coverImg: newUser.coverImg,
                }
            });
        }
        else {
            res.status(400).json({ message: 'Invalid user data' });
        }   


    }catch (error) {
        console.error('Error during signup:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const login = async (req, res) => {
    res.json({ 
        data: 'You hit the signup endpoint' 
    });
}

export const logout = async (req, res) => {
    res.json({ 
        data: 'You hit the signup endpoint' 
    });
}