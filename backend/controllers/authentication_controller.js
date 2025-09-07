import User from '../models/user_module.js';
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from '../lib/utils/generate_Token.js';

export const  singup = async (req, res) => {
    try {
        const { username, fullName, password, email } = req.body;

        // Validation
        if (!username || !fullName || !password || !email) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Password length check
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }

        // Check if username already exists
        const existingUsername = await User.findOne({  username  });
        if (existingUsername) {
            return res.status(400).json({ error: 'Username already in use' });
        }


        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Hash password, if someone gets access to the database, they won't see the actual password
        // Change password to hashed password(ex: 123456 to $2a$1QoeG6Lui5f2r9g6VqT)
        const salt = await bcrypt.genSalt(10);
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
            await newUser.save();
            generateTokenAndSetCookie(newUser._id, res); 
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
    
    try{
        const { username, password } = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = user ? await bcrypt.compare(password, user.password) : false;

        // Check if user exists and password is correct
        if (!user || !isPasswordCorrect) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

    

        // If login is successful, generate a token and set it in a cookie
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({ 
            message: 'Login successful', 
            user: { _id: user._id, 
                username: user.username, 
                fullName: user.fullName,
                email: user.email,
                followers: user.followers,
                following: user.following,
                profileImg: user.profileImg,
                coverImg: user.coverImg,
            } });
    }catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        // Clear the cookie
        res.clearCookie('token');
        res.json({ 
            data: 'You hit the logout endpoint' 
        });
    } catch (error) {
        console.error('Error during logout:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const getMe = async (req, res) => {
    try{
        const user = await User.findById(req.user._id).select('-password');
        res.status(200).json(user);
    }catch{
        console.error('Error retrieving user:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}