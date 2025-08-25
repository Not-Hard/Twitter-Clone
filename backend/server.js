import express from 'express';
import authRoutes from './routes/authentication_route.js';
import dotenv from 'dotenv';
import connectMongoDB from './db/connectMongoDB.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoutes);

app.use(express.json()); // Middleware to parse JSON request bodies

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
    connectMongoDB();
    });
