import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authentication_route.js';
import userRoutes from './routes/user_route.js';
import connectMongoDB from './db/connectMongoDB.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());

app.use(express.json()); // Middleware to parse JSON request bodies

app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);


app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
    connectMongoDB();
    });

