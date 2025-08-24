import express from 'express';
import authRoutes from './routes/authentication_route.js';
import dotenv from 'dotenv';
import connectMongoDB from './db/connectMongoDB.js';


const app = express();
const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
    connectMongoDB();
    });
