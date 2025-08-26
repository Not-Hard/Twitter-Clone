import express from 'express';
import {getMe, login, logout, singup } from '../controllers/authentication_controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/me', protectRoute, getMe);

router.post('/signup', singup);

router.post('/login', login);

router.post('/logout', logout);

export default router;