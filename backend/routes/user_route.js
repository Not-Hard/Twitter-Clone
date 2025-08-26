import express from 'express';
import { getUserProfile, followUnfollowUser } from '../controllers/user_controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/profile/:username', protectRoute, getUserProfile);
//router.get('/profile/suggested', protectRoute, getUserProfile);
router.get('/profile/follow/:id', protectRoute, followUnfollowUser);
//router.get('/profile/update',protectRoute, updateUserProfile);



export default router;
